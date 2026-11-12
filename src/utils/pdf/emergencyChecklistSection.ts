import i18n from '../../i18n';
import { PdfBuilder } from './PdfBuilder';

export const addEmergencyChecklistSection = (builder: PdfBuilder) => {
  builder.addChapterCover(
    i18n.t('wizardSteps.step8.checklistTitle', { defaultValue: 'Checkliste: Die ersten 24 Stunden' }),
    i18n.t('wizardSteps.step8.checklistDesc', { defaultValue: 'Wichtige Schritte und Sofortmaßnahmen im Not- oder Todesfall.' })
  );

  builder.drawLineText(i18n.t('pdf.emergencyChecklist.firstDayTitle'), true, 16);

  const tasks = i18n.t('pdf.emergencyChecklist.tasks', { returnObjects: true }) as string[];

  tasks.forEach((task, index) => {
    builder.currentY -= 5;
    builder.drawMultilineText(`[ ] ${index + 1}. ${task}`);
  });

  builder.currentY -= 20;
  builder.drawLineText(i18n.t('pdf.emergencyChecklist.laterDaysTitle'), true, 16);

  const laterTasks = i18n.t('pdf.emergencyChecklist.laterTasks', { returnObjects: true }) as string[];

  laterTasks.forEach((task, index) => {
    builder.currentY -= 5;
    builder.drawMultilineText(`[ ] ${index + 1}. ${task}`);
  });
};
