import i18n from '../../i18n';
import { PDFDocument, PDFTextField } from 'pdf-lib';
import { PdfBuilder } from './PdfBuilder';
import { formatDate } from './helpers';

export const addFinanceSection = async (builder: PdfBuilder) => {
  const hasFinanzen = (builder.data.bankAccounts && builder.data.bankAccounts.length > 0) || 
                      (builder.data.otherAssets && builder.data.otherAssets.length > 0) || 
                      (builder.data.realEstates && builder.data.realEstates.length > 0) || 
                      (builder.data.vehicles && builder.data.vehicles.length > 0) || 
                      builder.data.automotiveClubs || 
                      builder.data.financeNotes;
                      
  if (!hasFinanzen) return;

  builder.addChapterCover(
    i18n.t('pdf.financeSection.coverTitle'),
    i18n.t('pdf.financeSection.coverDesc')
  );
  builder.drawWarning(i18n.t('pdf.financeSection.warning'));
  builder.currentY -= 5;

  if (builder.data.bankAccounts && builder.data.bankAccounts.length > 0 && builder.data.bankAccounts.some(a => a.bankName || a.iban)) {
    builder.drawLineText(i18n.t('pdf.financeSection.accounts'), true, 12);
    const headers = (i18n.t('pdf.financeSection.accountHeaders', { returnObjects: true }) as string[]);
    const rows = builder.data.bankAccounts.filter(a => a.bankName || a.iban).map(acc => [
      acc.bankName || '',
      acc.accountHolder || '',
      acc.iban || '',
      acc.bic || ''
    ]);
    builder.drawTable(headers, rows);
  }

  if (builder.data.otherAssets && builder.data.otherAssets.length > 0 && builder.data.otherAssets.some(a => a.type || a.description || a.isHeading)) {
    builder.drawLineText(i18n.t('pdf.financeSection.assets'), true, 12);
    
    let currentSectionRows: string[][] = [];
    const headers = (i18n.t('pdf.financeSection.assetHeaders', { returnObjects: true }) as string[]);

    builder.data.otherAssets.forEach(a => {
      if (a.isHeading) {
        if (currentSectionRows.length > 0) {
          builder.drawTable(headers, currentSectionRows);
          currentSectionRows = [];
        }
        const t = a.title || a.type;
        if (t) {
          builder.currentY -= 5; 
          builder.drawLineText(t, true, 11, builder.config.colors.lightText);
        }
      } else if (a.type || a.description) {
        currentSectionRows.push([a.type || '', a.description || '']);
      }
    });

    if (currentSectionRows.length > 0) {
      builder.drawTable(headers, currentSectionRows);
    }
  }

  if (builder.data.realEstates && builder.data.realEstates.length > 0 && builder.data.realEstates.some(r => r.type || r.address)) {
    builder.drawLineText(i18n.t('pdf.financeSection.realEstate'), true, 12);
    const headers = (i18n.t('pdf.financeSection.realEstateHeaders', { returnObjects: true }) as string[]);
    const rows = builder.data.realEstates.filter(r => r.type || r.address).map(r => [r.type || '', r.country || '', r.address || '']);
    builder.drawTable(headers, rows);
  }

  if (builder.data.vehicles && builder.data.vehicles.length > 0 && builder.data.vehicles.some(v => v.type || v.licensePlate)) {
    builder.drawLineText(i18n.t('wizardSteps.step3.vehiclesTitle'), true, 12);
    const headers = [i18n.t('wizardSteps.step3.vehicleType'), i18n.t('wizardSteps.step3.licensePlate'), i18n.t('wizardSteps.step3.vehicleInsurance'), i18n.t('wizardSteps.step3.financing'), i18n.t('wizardSteps.step3.documentLocation')];
    const rows = builder.data.vehicles.filter(v => v.type || v.licensePlate).map(v => [v.type || '', v.licensePlate || '', v.insurance || '', v.financing || '', v.documentLocation || '']);
    builder.drawTable(headers, rows, { noWrapColumns: [1] });
  }

  if (builder.data.automotiveClubs) {
    builder.drawLineText(`${i18n.t('wizardSteps.step3.automotiveClubs')}: ${builder.data.automotiveClubs}`, false, 11);
    builder.currentY -= 5;
  }

  // BMJV Vollmachten (after overview in Finanzen)
  if (builder.data.bankAccounts && builder.data.bankAccounts.some(a => a.hasPowerOfAttorney)) {
    try {
      const templateBytes = await fetch('/Konto_und_Depotvollmacht.pdf').then(res => {
        if (!res.ok) throw new Error('BMJV Template not found');
        return res.arrayBuffer();
      });

      for (const account of builder.data.bankAccounts) {
        if (account.hasPowerOfAttorney) {
          try {
            const templatePdf = await PDFDocument.load(templateBytes);
            const form = templatePdf.getForm();
            
            const poaData = account;

            const fillField = (name: string, value: string) => {
              try {
                const field = form.getField(name);
                if (field instanceof PDFTextField) field.setText(value);
              } catch {
                // ignore
              }
            };

            const vollmachtgeber = `${builder.data.firstName || ''} ${builder.data.lastName || ''}\n${builder.data.street || ''} ${builder.data.houseNumber || ''}\n${builder.data.zipCode || ''} ${builder.data.city || ''}`;
            fillField('Name und Anschrift', vollmachtgeber);
            
            const bankName = `${account.bankName || ''}\n${account.bankAddress || ''}`;
            fillField('Name und Anschrift der BankSparkasse', bankName);

            const bevol = `${poaData.poaFirstName || ''} ${poaData.poaLastName || ''}\n${poaData.poaAddress || ''}`;
            fillField('Name, Vorname', bevol);
            fillField('Geburtsdatum', formatDate(poaData.poaBirthDate || ''));
            fillField('TelefonNummer', poaData.poaPhone || '');

            form.flatten();
            
            const filledPages = await builder.pdfDoc.copyPages(templatePdf, templatePdf.getPageIndices());
            filledPages.forEach(p => builder.pdfDoc.addPage(p));
          } catch {
            // ignore
          }
        }
      }
    } catch (err) {
      console.error('Fehler beim Laden der BMJV-Vorlage:', err);
    }
  }

  if (builder.data.financeNotes) {
    builder.addNotesPage(builder.data.financeNotes, 'Finanzen');
  }
};
