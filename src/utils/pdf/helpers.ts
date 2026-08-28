import { PDFFont } from 'pdf-lib';

export const formatDate = (dateStr: string | undefined | null) => {
  if (!dateStr) return '';
  const parts = dateStr.split('-');
  if (parts.length === 3) {
    return `${parts[2]}.${parts[1]}.${parts[0]}`;
  }
  return dateStr;
};

export const splitTextToLines = (text: string, maxWidth: number, font: PDFFont, size: number) => {
  if (!text) return [];
  const lines: string[] = [];
  const paragraphs = text.split('\n');
  for (const paragraph of paragraphs) {
    let currentLine = '';

    // Split into wrappable segments at spaces, hyphens, and slashes
    // Keeps the break character with the preceding segment:
    // "KFZ-Versicherung" → ["KFZ-", "Versicherung"]
    // "Fahrzeugbrief / Zweitschlüssel" → ["Fahrzeugbrief ", "/ ", "Zweitschlüssel"]
    const segments: string[] = [];
    let seg = '';
    for (let i = 0; i < paragraph.length; i++) {
      const ch = paragraph[i];
      seg += ch;
      if (ch === ' ' || ch === '-' || ch === '/') {
        segments.push(seg);
        seg = '';
      }
    }
    if (seg) segments.push(seg);

    for (const segment of segments) {
      let remaining = segment;

      while (remaining.length > 0) {
        const testLine = currentLine + remaining;
        if (font.widthOfTextAtSize(testLine, size) <= maxWidth) {
          currentLine = testLine;
          remaining = '';
        } else {
          if (currentLine.trimEnd()) {
            lines.push(currentLine.trimEnd());
            currentLine = '';
            remaining = remaining.trimStart();
          } else {
            // Single segment wider than maxWidth – break character by character
            let brokenPart = '';
            for (let i = 0; i < remaining.length; i++) {
              const charTest = brokenPart + remaining[i];
              if (font.widthOfTextAtSize(charTest, size) <= maxWidth) {
                brokenPart = charTest;
              } else {
                break;
              }
            }
            if (!brokenPart) brokenPart = remaining[0];
            lines.push(brokenPart);
            remaining = remaining.substring(brokenPart.length);
            currentLine = '';
          }
        }
      }
    }
    if (currentLine.trimEnd()) {
      lines.push(currentLine.trimEnd());
    }
  }
  return lines;
};

export const romanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII', 'XIII', 'XIV', 'XV', 'XVI', 'XVII', 'XVIII', 'XIX', 'XX'];
