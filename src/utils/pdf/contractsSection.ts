import i18n from '../../i18n';
import { PdfBuilder } from './PdfBuilder';

export const addContractsSection = (builder: PdfBuilder) => {
  const hasContracts = builder.data.contracts && builder.data.contracts.length > 0 && builder.data.contracts.some(c => c.type || c.provider);
  const hasSubscriptions = builder.data.subscriptions && builder.data.subscriptions.length > 0 && builder.data.subscriptions.some(s => s.provider);
  const hasServices = builder.data.serviceProviders && builder.data.serviceProviders.length > 0 && builder.data.serviceProviders.some(s => s.role || s.name);
  const hasMeters = !!builder.data.meterNumbers;

  if (hasContracts || hasSubscriptions || hasServices || hasMeters || builder.data.contractNotes) {
    builder.addChapterCover(
      i18n.t('pdf.contractsSection.coverTitle'),
      i18n.t('pdf.contractsSection.coverDesc')
    );
    
    if (hasContracts) {
      const headers = (i18n.t('pdf.contractsSection.headers', { returnObjects: true }) as string[]);
      const rows = builder.data.contracts.filter(c => c.type || c.provider).map(c => [c.type || '', c.provider || '', c.contractNumber || '']);
      builder.drawTable(headers, rows);
    }

    if (hasSubscriptions) {
      builder.drawLineText(i18n.t('wizardSteps.step4.subscriptionsTitle'), true, 12);
      const headers = [i18n.t('wizardSteps.step4.subProvider'), i18n.t('wizardSteps.step4.customerNumber'), i18n.t('wizardSteps.step4.cancellationNotice')];
      const rows = builder.data.subscriptions.filter(s => s.provider).map(s => [s.provider || '', s.customerNumber || '', s.cancellationNotice || '']);
      builder.drawTable(headers, rows);
    }

    if (hasServices) {
      builder.drawLineText(i18n.t('wizardSteps.step4.servicesTitle'), true, 12);
      const headers = [i18n.t('wizardSteps.step4.serviceRole'), i18n.t('wizardSteps.step4.serviceName'), i18n.t('wizardSteps.step4.serviceContact')];
      const rows = builder.data.serviceProviders.filter(s => s.role || s.name).map(s => [s.role || '', s.name || '', s.contact || '']);
      builder.drawTable(headers, rows);
    }

    if (hasMeters) {
      builder.drawLineText(`${i18n.t('wizardSteps.step4.meterNumbers')}: ${builder.data.meterNumbers}`, false, 11);
      builder.currentY -= 5;
    }
    
    if (builder.data.contractNotes) {
      builder.addNotesPage(builder.data.contractNotes, 'Verträge & Verbindlichkeiten');
    }
  }
};
