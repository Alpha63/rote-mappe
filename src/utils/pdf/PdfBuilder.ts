import i18n from '../../i18n';
import { PDFDocument, PDFPage, PDFFont } from 'pdf-lib';
import { FormData, ScannedDocument } from '../../types';
import { templates, TemplateConfig } from '../pdfTemplates';
import { splitTextToLines, romanNumerals } from './helpers';

export class PdfBuilder {
  pdfDoc: PDFDocument;
  config: TemplateConfig;
  templateName: string;
  data: FormData;

  fontRegular: PDFFont;
  fontBold: PDFFont;
  fontItalic: PDFFont;
  fontBoldItalic: PDFFont;
  fontSerif: PDFFont;

  PAGE_WIDTH = 595.28;
  PAGE_HEIGHT = 841.89;

  currentPage!: PDFPage;
  currentY!: number;
  tocY!: number;

  tocEntries: { title: string }[] = [];
  chapterIndex = 0;
  lineHeight = 20;
  includePlaceholders: boolean;
  includeWarnings: boolean;

  constructor(pdfDoc: PDFDocument, data: FormData, templateName: string, fontRegular: PDFFont, fontBold: PDFFont, fontItalic: PDFFont, fontBoldItalic: PDFFont, fontSerif: PDFFont, includePlaceholders: boolean = true, includeWarnings: boolean = true) {
    this.pdfDoc = pdfDoc;
    this.data = data;
    this.templateName = templateName;
    this.config = templates[templateName] || templates.default;
    this.fontRegular = fontRegular;
    this.fontBold = fontBold;
    this.fontItalic = fontItalic;
    this.fontBoldItalic = fontBoldItalic;
    this.fontSerif = fontSerif;
    this.includePlaceholders = includePlaceholders;
    this.includeWarnings = includeWarnings;
    this.tocY = this.PAGE_HEIGHT - 80;
  }

  checkPageBreak(spaceNeeded: number) {
    if (this.currentY - spaceNeeded < 60) {
      this.currentPage = this.pdfDoc.addPage([this.PAGE_WIDTH, this.PAGE_HEIGHT]);
      this.currentY = this.PAGE_HEIGHT - 80;
    }
  }

  drawLineText(text: string, isBold = false, size = 11, color = this.config.colors.text) {
    this.checkPageBreak(size * 1.5);
    this.currentPage.drawText(text, {
      x: 50,
      y: this.currentY,
      size: size,
      font: isBold ? (this.templateName === 'modern' ? this.fontBold : this.fontBold) : this.fontRegular,
      color: color,
    });
    this.currentY -= size * 1.5;
  }

  drawMultilineHeading(text: string, size = 18) {
    if (!text) return;
    const lines = splitTextToLines(text, this.PAGE_WIDTH - 100, this.fontBold, size);
    lines.forEach(line => {
      this.drawLineText(line, true, size, this.config.colors.text);
    });
  }

  drawKeyValue(key: string, value: string) {
    this.checkPageBreak(11 * 1.5);
    this.currentPage.drawText(key, {
      x: 50,
      y: this.currentY,
      size: 11,
      font: this.fontBold,
      color: this.config.colors.text,
    });
    this.currentPage.drawText(value, {
      x: 230,
      y: this.currentY,
      size: 11,
      font: this.fontRegular,
      color: this.config.colors.lightText,
    });
    this.currentY -= 11 * 1.5;
  }

  addChapterCover(title: string, description: string) {
    const roman = romanNumerals[this.chapterIndex] || (this.chapterIndex + 1).toString();
    const fullTitle = `${roman}. ${title}`;
    
    // Add to ToC
    this.tocEntries.push({ title: fullTitle });
    
    // Create Chapter Cover Page
    const cover = this.pdfDoc.addPage([this.PAGE_WIDTH, this.PAGE_HEIGHT]);
    
    const titleFont = this.templateName === 'modern' ? this.fontSerif : this.fontBold;
    const titleLines = splitTextToLines(fullTitle, this.PAGE_WIDTH - 120, titleFont, 26);
    
    // Multi-line description for cover
    const maxDescWidthChars = 65;
    const descLines: string[] = [];
    description.split('\n').forEach(line => {
      let remaining = line;
      while (remaining.length > 0) {
        descLines.push(remaining.substring(0, maxDescWidthChars));
        remaining = remaining.substring(maxDescWidthChars);
      }
    });

    const contentHeight = (titleLines.length * 30) + 10 + (descLines.length * 20);
    const rectHeight = Math.max(160, contentHeight + 60);

    cover.drawRectangle({
      x: 0,
      y: this.PAGE_HEIGHT / 2 - (rectHeight / 2),
      width: this.PAGE_WIDTH,
      height: rectHeight,
      color: this.config.colors.chapterCoverBg,
    });
    
    let currentContentY = this.PAGE_HEIGHT / 2 + (contentHeight / 2) - 26;

    titleLines.forEach(line => {
      cover.drawText(line, {
        x: 50,
        y: currentContentY,
        size: 26,
        font: titleFont,
        color: this.config.colors.chapterCoverText,
      });
      currentContentY -= 30;
    });
    
    currentContentY -= 10;

    descLines.forEach(line => {
      cover.drawText(line, {
        x: 50,
        y: currentContentY,
        size: 14,
        font: this.fontRegular,
        color: this.config.colors.lightText,
      });
      currentContentY -= 20;
    });
    
    this.chapterIndex++;
    
    // Start actual content page for this chapter
    this.currentPage = this.pdfDoc.addPage([this.PAGE_WIDTH, this.PAGE_HEIGHT]);
    this.currentY = this.PAGE_HEIGHT - 80;
  }

  drawWarning(text: string) {
    if (!this.includeWarnings) return;
    this.checkPageBreak(this.lineHeight);
    this.currentPage.drawText(text, {
      x: 50,
      y: this.currentY,
      size: 10,
      font: this.fontBold,
      color: this.config.colors.warning,
    });
    this.currentY -= this.lineHeight;
  }

  drawMultilineText(text: string, maxWidth = this.PAGE_WIDTH - 100) {
    if (!text) return;
    
    const paragraphs = text.split('\n');
    
    for (const paragraph of paragraphs) {
      if (paragraph.trim() === '') {
        this.currentY -= 11 * 1.5;
        this.checkPageBreak(11 * 1.5);
        continue;
      }

      // Regex parst Markdown: **Fett**, *Kursiv*, [Link](url), https://...
      const regex = /(\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^)]+\)|https?:\/\/[^\s]+)/g;
      const tokens: {text: string, bold: boolean, italic: boolean, link?: string}[] = [];
      let lastIndex = 0;
      let match;
      
      while ((match = regex.exec(paragraph)) !== null) {
        if (match.index > lastIndex) {
          tokens.push({ text: paragraph.substring(lastIndex, match.index), bold: false, italic: false });
        }
        const tokenStr = match[0];
        if (tokenStr.startsWith('**')) {
          tokens.push({ text: tokenStr.substring(2, tokenStr.length - 2), bold: true, italic: false });
        } else if (tokenStr.startsWith('*')) {
          tokens.push({ text: tokenStr.substring(1, tokenStr.length - 1), bold: false, italic: true });
        } else if (tokenStr.startsWith('[')) {
          const closeBracket = tokenStr.indexOf(']');
          const openParen = tokenStr.indexOf('(');
          const closeParen = tokenStr.indexOf(')');
          tokens.push({
            text: tokenStr.substring(1, closeBracket),
            bold: false,
            italic: false,
            link: tokenStr.substring(openParen + 1, closeParen)
          });
        } else if (tokenStr.startsWith('http')) {
          tokens.push({ text: tokenStr, bold: false, italic: false, link: tokenStr });
        }
        lastIndex = regex.lastIndex;
      }
      if (lastIndex < paragraph.length) {
        tokens.push({ text: paragraph.substring(lastIndex), bold: false, italic: false });
      }

      let currentLine: typeof tokens = [];
      let currentLineWidth = 0;
      
      const getFont = (bold: boolean, italic: boolean) => {
        if (bold && italic) return this.fontBoldItalic;
        if (bold) return this.fontBold;
        if (italic) return this.fontItalic;
        return this.fontRegular;
      };

      const drawCurrentLine = () => {
        if (currentLine.length === 0) return;
        this.checkPageBreak(11 * 1.5);
        let x = 50;
        for (const token of currentLine) {
          const font = getFont(token.bold, token.italic);
          const color = token.link ? this.config.colors.primary : this.config.colors.lightText;
          this.currentPage.drawText(token.text, { x, y: this.currentY, size: 11, font, color });
          const textWidth = font.widthOfTextAtSize(token.text, 11);
          
          if (token.link) {
            this.currentPage.drawLine({ start: { x, y: this.currentY - 1 }, end: { x: x + textWidth, y: this.currentY - 1 }, thickness: 0.5, color });
            const linkAnnot = this.pdfDoc.context.register(
              this.pdfDoc.context.obj({
                Type: 'Annot',
                Subtype: 'Link',
                Rect: [x, this.currentY - 2, x + textWidth, this.currentY + 11],
                Border: [0, 0, 0],
                A: { Type: 'Action', S: 'URI', URI: String(token.link) },
              })
            );
            this.currentPage.node.addAnnot(linkAnnot);
          }
          x += textWidth;
        }
        this.currentY -= 11 * 1.5;
        currentLine = [];
        currentLineWidth = 0;
      };

      for (const token of tokens) {
        const words = token.text.split(/(\s+)/);
        for (const word of words) {
          if (!word) continue;
          const font = getFont(token.bold, token.italic);
          const wordWidth = font.widthOfTextAtSize(word, 11);
          
          if (currentLineWidth + wordWidth > maxWidth && word.trim().length > 0 && currentLineWidth > 0) {
            drawCurrentLine();
          }
          if (currentLineWidth === 0 && word.trim().length === 0) {
            continue;
          }
          
          if (wordWidth > maxWidth) {
             let currentPart = '';
             let partWidth = 0;
             for (const char of word) {
                const charWidth = font.widthOfTextAtSize(char, 11);
                if (currentLineWidth + partWidth + charWidth > maxWidth) {
                   if (currentPart) {
                      currentLine.push({ ...token, text: currentPart });
                      drawCurrentLine();
                   }
                   currentPart = char;
                   partWidth = charWidth;
                } else {
                   currentPart += char;
                   partWidth += charWidth;
                }
             }
             if (currentPart) {
                currentLine.push({ ...token, text: currentPart });
                currentLineWidth += partWidth;
             }
          } else {
             currentLine.push({ ...token, text: word });
             currentLineWidth += wordWidth;
          }
        }
      }
      drawCurrentLine();
    }
  }

  drawTable(headers: string[], rows: string[][], options?: { noWrapColumns?: number[] }) {
    const startX = 50;
    const tableMaxWidth = this.PAGE_WIDTH - 100;
    const colCount = headers.length;

    const minWidths = new Array(colCount).fill(0);
    const maxWidths = new Array(colCount).fill(0);

    const getWidths = (text: string, isBold: boolean) => {
      const f = isBold ? this.fontBold : this.fontRegular;
      if (!text) return { min: 0, max: 0 };
      // Split at spaces and after hyphens/slashes for proper min-width calculation
      const parts = text.split(/\s+|(?<=[-\/])/).filter(p => p.length > 0);
      const min = Math.max(...parts.map(w => f.widthOfTextAtSize(w, 10)));
      const max = f.widthOfTextAtSize(text, 10);
      return { min, max };
    };

    for (let i = 0; i < colCount; i++) {
      const hW = getWidths(headers[i], true);
      minWidths[i] = Math.max(minWidths[i], hW.min + 10);
      maxWidths[i] = Math.max(maxWidths[i], hW.max + 15);
      rows.forEach(r => {
        const cW = getWidths(r[i] || '', false);
        minWidths[i] = Math.max(minWidths[i], cW.min + 10);
        maxWidths[i] = Math.max(maxWidths[i], cW.max + 15);
      });
      
      if (headers[i] === 'Dienst') minWidths[i] = Math.max(minWidths[i], this.fontRegular.widthOfTextAtSize('Facebook', 10) + 10);
      if (headers[i] === 'Benutzername' || headers[i] === 'E-Mail') minWidths[i] = Math.max(minWidths[i], this.fontRegular.widthOfTextAtSize('herr.bauerfranz@googlemail.com', 10) + 10);
      if (headers[i] === 'Passwort/PIN') minWidths[i] = Math.max(minWidths[i], this.fontRegular.widthOfTextAtSize('123456789', 10) + 10);
      if (headers[i] === 'Link') minWidths[i] = Math.max(minWidths[i], this.fontRegular.widthOfTextAtSize('www.musterdomain.de', 10) + 10);

      // No-wrap columns: ensure column is wide enough to display content without wrapping
      if (options?.noWrapColumns?.includes(i)) {
        minWidths[i] = Math.max(minWidths[i], maxWidths[i]);
      }
    }

    const colWidths = new Array(colCount).fill(0);
    const totalMin = minWidths.reduce((a,b) => a+b, 0);
    
    if (totalMin >= tableMaxWidth) {
      for (let i = 0; i < colCount; i++) {
        colWidths[i] = (minWidths[i] / totalMin) * tableMaxWidth;
      }
    } else {
      const flexibleSpace = tableMaxWidth - totalMin;
      const flexTotal = maxWidths.reduce((a,b,i) => a + Math.max(0, b - minWidths[i]), 0);
      
      if (flexTotal > 0) {
        for (let i = 0; i < colCount; i++) {
          const flex = Math.max(0, maxWidths[i] - minWidths[i]);
          colWidths[i] = minWidths[i] + (flex / flexTotal) * flexibleSpace;
        }
      } else {
        for (let i = 0; i < colCount; i++) {
          colWidths[i] = minWidths[i] + (flexibleSpace / colCount);
        }
      }
    }

    const tableWidth = tableMaxWidth;

    // Pre-calculate header wrapping for height computation
    const headerLines = headers.map((h, i) => {
      const maxWidth = colWidths[i] - 10;
      return splitTextToLines(h, maxWidth > 0 ? maxWidth : 10, this.fontBold, 10);
    });
    const maxHeaderLineCount = Math.max(1, ...headerLines.map(lines => lines.length));
    const headerRowHeight = (maxHeaderLineCount - 1) * 12 + 20;

    // Helper: draw the table header at the current position
    const drawHeader = () => {
      this.currentPage.drawRectangle({
        x: startX,
        y: this.currentY - (maxHeaderLineCount - 1) * 12 - 5,
        width: tableWidth,
        height: headerRowHeight,
        color: this.config.colors.tableHeaderBg,
      });

      let hx = startX;
      headerLines.forEach((lines, i) => {
        lines.forEach((line, lineIndex) => {
          this.currentPage.drawText(line, { x: hx + 5, y: this.currentY - (lineIndex * 12), size: 10, font: this.fontBold, color: this.config.colors.tableHeaderText });
        });
        hx += colWidths[i];
      });
      this.currentY -= (maxHeaderLineCount - 1) * 12 + 15;
    };

    // Check page break before spacing + header
    this.checkPageBreak(15 + headerRowHeight + 5);
    this.currentY -= 15; // Spacing before the table

    // Draw the initial header
    drawHeader();

    rows.forEach((row, rowIndex) => {
      const cellLines = row.map((cell, i) => {
        const maxWidth = colWidths[i] - 10;
        return splitTextToLines(cell || '', maxWidth > 0 ? maxWidth : 10, this.fontRegular, 10);
      });
      
      const maxLines = Math.max(1, ...cellLines.map(lines => lines.length));
      const rowHeight = maxLines * 12 + 3;

      // If the row doesn't fit, start a new page and re-draw the header
      if (this.currentY - rowHeight < 60) {
        this.currentPage = this.pdfDoc.addPage([this.PAGE_WIDTH, this.PAGE_HEIGHT]);
        this.currentY = this.PAGE_HEIGHT - 80;
        drawHeader();
      }
      
      if (rowIndex % 2 === 1) {
        this.currentPage.drawRectangle({
          x: startX,
          y: this.currentY + 12 - rowHeight,
          width: tableWidth,
          height: rowHeight,
          color: this.config.colors.tableEvenRowBg,
        });
      }

      let currentX = startX;
      cellLines.forEach((lines, i) => {
        lines.forEach((line, lineIndex) => {
          this.currentPage.drawText(line, { 
            x: currentX + 5, 
            y: this.currentY - (lineIndex * 12), 
            size: 10, 
            font: this.fontRegular, 
            color: this.config.colors.text
          });
        });
        currentX += colWidths[i];
      });
      this.currentY -= rowHeight;
    });
    this.currentY -= 10;
  }

  async addDocumentPage(doc: ScannedDocument | undefined | null) {
    if (!doc?.name || doc.documentAction === 'skip') return;

    if (doc.documentAction === 'upload' && doc.fileData) {
      try {
        const base64Data = doc.fileData.includes(',') ? doc.fileData.split(',')[1] : doc.fileData;

        if (doc.fileType === 'application/pdf' || doc.fileData.startsWith('data:application/pdf')) {
          const embeddedPdf = await PDFDocument.load(base64Data);
          const embeddedPages = await this.pdfDoc.copyPages(embeddedPdf, embeddedPdf.getPageIndices());
          
          this.currentPage = this.pdfDoc.addPage([this.PAGE_WIDTH, this.PAGE_HEIGHT]);
          this.currentY = this.PAGE_HEIGHT - 80;
          this.drawMultilineHeading(`${i18n.t('pdf.helpers.attachmentPdf')}${doc.name}`, 18);
          
          embeddedPages.forEach(p => {
             this.pdfDoc.addPage(p);
          });
        } else {
          let img;
          if (doc.fileType === 'image/jpeg' || doc.fileType === 'image/jpg' || doc.fileData.startsWith('data:image/jpeg')) {
            img = await this.pdfDoc.embedJpg(base64Data);
          } else if (doc.fileType === 'image/png' || doc.fileData.startsWith('data:image/png')) {
            img = await this.pdfDoc.embedPng(base64Data);
          }

          if (img) {
            this.currentPage = this.pdfDoc.addPage([this.PAGE_WIDTH, this.PAGE_HEIGHT]);
            this.currentY = this.PAGE_HEIGHT - 80;
            this.drawMultilineHeading(`${i18n.t('pdf.helpers.attachment')}${doc.name}`, 18);
            this.currentY -= 20;
            
            const maxImgWidth = this.PAGE_WIDTH - 100;
            const maxImgHeight = this.currentY - 50;
            
            let scaledWidth = img.width;
            let scaledHeight = img.height;
            
            if (scaledWidth > maxImgWidth) {
              scaledHeight = (scaledHeight * maxImgWidth) / scaledWidth;
              scaledWidth = maxImgWidth;
            }
            if (scaledHeight > maxImgHeight) {
              scaledWidth = (scaledWidth * maxImgHeight) / scaledHeight;
              scaledHeight = maxImgHeight;
            }
            
            this.currentPage.drawImage(img, {
              x: (this.PAGE_WIDTH - scaledWidth) / 2,
              y: this.currentY - scaledHeight,
              width: scaledWidth,
              height: scaledHeight,
            });
          }
        }
      } catch {
        // ignore
      }
    } else if (doc.documentAction === 'placeholder' && this.includePlaceholders) {
      this.currentPage = this.pdfDoc.addPage([this.PAGE_WIDTH, this.PAGE_HEIGHT]);
      this.currentY = this.PAGE_HEIGHT - 80;
      
      this.drawMultilineHeading(doc.name, 18);
      this.currentY -= 10;
      this.drawMultilineText(i18n.t('pdf.helpers.placeholderText', { name: doc.name }));
    }
  }

  addNotesPage(notes: string | undefined, sectionName?: string) {
    if (!notes) return;
    this.currentPage = this.pdfDoc.addPage([this.PAGE_WIDTH, this.PAGE_HEIGHT]);
    this.currentY = this.PAGE_HEIGHT - 80;
    const title = sectionName ? i18n.t('pdf.helpers.notesTitle', { sectionName }) : i18n.t('pdf.helpers.generalNotesTitle');
    this.drawMultilineHeading(title, 18);
    this.currentY -= 10;
    this.drawMultilineText(notes);
  }
}
