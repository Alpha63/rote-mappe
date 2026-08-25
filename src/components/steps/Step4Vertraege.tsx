import { useFormContext, useFieldArray } from 'react-hook-form';
import { Input } from '../../Input';
import { Textarea } from '../../Textarea';
import { Info, Trash2, Plus } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { FormSchemaType } from '../../schema';

export function Step4Vertraege() {
  const { register, control, watch, setValue, formState: { errors } } = useFormContext<FormSchemaType>();
  const { t } = useTranslation();

  const { fields: contractFields, append: appendContract, remove: removeContract } = useFieldArray({
    control,
    name: 'contracts'
  });

  const { fields: subscriptionFields, append: appendSubscription, remove: removeSubscription } = useFieldArray({
    control,
    name: 'subscriptions'
  });

  const { fields: serviceProviderFields, append: appendServiceProvider, remove: removeServiceProvider } = useFieldArray({
    control,
    name: 'serviceProviders'
  });

  const contractNotes = watch('contractNotes');

  return (
    <div className="animate-in fade-in zoom-in-95 duration-500">
      <div className="mb-8">
        <h2 className="text-3xl font-serif text-slate-900 dark:text-slate-100 mb-3">{t('wizardSteps.step4.title')}</h2>
        <p className="text-slate-600 dark:text-slate-400 flex items-center gap-2"><Info size={18} className="text-indigo-600 dark:text-indigo-400" /> {t('wizardSteps.step4.desc')}</p>
      </div>
      <div className="space-y-4">
        {contractFields.map((contract, index) => (
          <div key={contract.id} className="p-4 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 relative shadow-sm">
            <button
              type="button"
              onClick={() => removeContract(index)}
              className="absolute top-4 right-4 text-slate-300 dark:text-slate-400 hover:text-red-500 dark:hover:text-red-400"
            >
              <Trash2 size={20} />
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              <Input
                label={t('wizardSteps.step4.contractType')}
                {...register(`contracts.${index}.type`)}
                error={errors.contracts?.[index]?.type?.message}
                className="p-2.5"
              />
              <Input
                label={t('wizardSteps.step4.provider')}
                {...register(`contracts.${index}.provider`)}
                error={errors.contracts?.[index]?.provider?.message}
                className="p-2.5"
              />
              <div className="md:col-span-2">
                <Input
                  label={t('wizardSteps.step4.contractNumber')}
                  {...register(`contracts.${index}.contractNumber`)}
                  error={errors.contracts?.[index]?.contractNumber?.message}
                  className="p-2.5"
                />
              </div>
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={() => appendContract({ id: crypto.randomUUID(), type: t('wizardSteps.step4.insurance'), provider: '', contractNumber: '' })}
          className="w-full py-3 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl text-indigo-600 dark:text-indigo-400 font-medium flex items-center justify-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-800/50"
        >
          <Plus size={20} /> {t('wizardSteps.step4.addContract')}
        </button>
      </div>

      <div className="space-y-4 mt-10">
        <h3 className="text-lg font-medium text-slate-800 dark:text-slate-200 mb-4 border-b border-slate-100 dark:border-slate-800 pb-2">{t('wizardSteps.step4.subscriptionsTitle')}</h3>
        <p className="text-slate-600 dark:text-slate-400 mb-4 text-sm">{t('wizardSteps.step4.subscriptionsDesc')}</p>
        {subscriptionFields.map((sub, index) => (
          <div key={sub.id} className="p-4 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 relative shadow-sm">
            <button
              type="button"
              onClick={() => removeSubscription(index)}
              className="absolute top-4 right-4 text-slate-300 dark:text-slate-400 hover:text-red-500 dark:hover:text-red-400"
            >
              <Trash2 size={20} />
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              <Input
                label={t('wizardSteps.step4.subProvider')}
                {...register(`subscriptions.${index}.provider`)}
                error={errors.subscriptions?.[index]?.provider?.message}
                className="p-2.5"
              />
              <Input
                label={t('wizardSteps.step4.customerNumber')}
                {...register(`subscriptions.${index}.customerNumber`)}
                error={errors.subscriptions?.[index]?.customerNumber?.message}
                className="p-2.5"
              />
              <div className="md:col-span-2">
                <Input
                  label={t('wizardSteps.step4.cancellationNotice')}
                  {...register(`subscriptions.${index}.cancellationNotice`)}
                  error={errors.subscriptions?.[index]?.cancellationNotice?.message}
                  className="p-2.5"
                />
              </div>
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={() => appendSubscription({ id: crypto.randomUUID(), provider: '', customerNumber: '', cancellationNotice: '' })}
          className="w-full py-3 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl text-indigo-600 dark:text-indigo-400 font-medium flex items-center justify-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-800/50"
        >
          <Plus size={20} /> {t('wizardSteps.step4.addSubscription')}
        </button>
      </div>

      <div className="space-y-4 mt-10">
        <h3 className="text-lg font-medium text-slate-800 dark:text-slate-200 mb-4 border-b border-slate-100 dark:border-slate-800 pb-2">{t('wizardSteps.step4.servicesTitle')}</h3>
        <p className="text-slate-600 dark:text-slate-400 mb-4 text-sm">{t('wizardSteps.step4.servicesDesc')}</p>
        {serviceProviderFields.map((service, index) => (
          <div key={service.id} className="p-4 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 relative shadow-sm">
            <button
              type="button"
              onClick={() => removeServiceProvider(index)}
              className="absolute top-4 right-4 text-slate-300 dark:text-slate-400 hover:text-red-500 dark:hover:text-red-400"
            >
              <Trash2 size={20} />
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              <Input
                label={t('wizardSteps.step4.serviceRole')}
                {...register(`serviceProviders.${index}.role`)}
                error={errors.serviceProviders?.[index]?.role?.message}
                className="p-2.5"
              />
              <Input
                label={t('wizardSteps.step4.serviceName')}
                {...register(`serviceProviders.${index}.name`)}
                error={errors.serviceProviders?.[index]?.name?.message}
                className="p-2.5"
              />
              <div className="md:col-span-2">
                <Input
                  label={t('wizardSteps.step4.serviceContact')}
                  {...register(`serviceProviders.${index}.contact`)}
                  error={errors.serviceProviders?.[index]?.contact?.message}
                  className="p-2.5"
                />
              </div>
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={() => appendServiceProvider({ id: crypto.randomUUID(), role: '', name: '', contact: '' })}
          className="w-full py-3 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl text-indigo-600 dark:text-indigo-400 font-medium flex items-center justify-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-800/50"
        >
          <Plus size={20} /> {t('wizardSteps.step4.addService')}
        </button>
        <div className="mt-4">
          <Input
            label={t('wizardSteps.step4.meterNumbers')}
            {...register('meterNumbers')}
            error={errors.meterNumbers?.message}
            className="p-2.5"
          />
        </div>
        <div className="pt-6 border-t border-slate-100 dark:border-slate-800 mt-6">
          <Textarea
            label={t('wizardSteps.step4.notesLabel')}
            description={t('wizardSteps.step4.notesDesc')}
            value={contractNotes || ''}
            onChange={(e) => setValue('contractNotes', e.target.value, { shouldValidate: true, shouldDirty: true })}
          />
        </div>
      </div>
    </div>
  );
}
