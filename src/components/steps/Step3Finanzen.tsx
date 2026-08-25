import { useFormContext, useFieldArray } from 'react-hook-form';
import { Input } from '../../Input';
import { Textarea } from '../../Textarea';
import { Info, Trash2, Plus, Type, AlertCircle, Copy } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { FormSchemaType } from '../../schema';

export function Step3Finanzen() {
  const { register, control, watch, setValue, getValues, formState: { errors } } = useFormContext<FormSchemaType>();
  const { t } = useTranslation();

  const { fields: bankAccountFields, append: appendBankAccount, remove: removeBankAccount } = useFieldArray({
    control,
    name: 'bankAccounts'
  });

  const { fields: otherAssetFields, append: appendOtherAsset, remove: removeOtherAsset } = useFieldArray({
    control,
    name: 'otherAssets'
  });

  const { fields: realEstateFields, append: appendRealEstate, remove: removeRealEstate } = useFieldArray({
    control,
    name: 'realEstates'
  });

  const { fields: vehicleFields, append: appendVehicle, remove: removeVehicle } = useFieldArray({
    control,
    name: 'vehicles'
  });

  const watchedBankAccounts = watch('bankAccounts');
  const financeNotes = watch('financeNotes');

  return (
    <div className="animate-in fade-in zoom-in-95 duration-500">
      <div className="mb-8">
        <h2 className="text-3xl font-serif text-slate-900 dark:text-slate-100 mb-3">{t('wizardSteps.step3.title')}</h2>
        <p className="text-slate-600 dark:text-slate-400 flex items-center gap-2"><Info size={18} className="text-indigo-600 dark:text-indigo-400" /> {t('wizardSteps.step3.desc')}</p>
      </div>
      <div className="bg-rose-50 dark:bg-rose-900/20 border border-red-200 dark:border-red-900/50 rounded-xl p-4 mb-8 flex flex-col gap-2 text-red-800 dark:text-red-300">
        <div className="flex items-start gap-3">
          <AlertCircle className="shrink-0 mt-0.5" size={20} />
          <div className="text-sm">
            <strong className="font-semibold">{t('wizardSteps.step3.importantTitle')}</strong><br/>
            {t('wizardSteps.step3.importantDesc')}
          </div>
        </div>
        <div className="flex items-start gap-3 pt-2 border-t border-red-200 dark:border-red-900/50">
          <Info className="shrink-0 mt-0.5 text-red-700 dark:text-red-400" size={20} />
          <div className="text-sm text-red-700 dark:text-red-400">
            <strong className="font-semibold block mb-1">{t('wizardSteps.step3.poaHintTitle')}</strong>
            {t('wizardSteps.step3.poaHintDesc')}<br/>
            <a href="https://www.bmjv.de/DE/service/formulare/form_vorsorgevollmacht/form_vorsorgevollmacht_artikel.html?nn=17628" target="_blank" rel="noopener noreferrer" className="underline hover:text-red-900 dark:hover:text-red-100 break-all">https://www.bmjv.de/DE/service/formulare/form_vorsorgevollmacht/form_vorsorgevollmacht_artikel.html?nn=17628</a>
          </div>
        </div>
      </div>
      <div className="space-y-10">
        <section>
          <h3 className="text-lg font-medium text-slate-800 dark:text-slate-200 mb-4 border-b border-slate-100 dark:border-slate-800 pb-2">{t('wizardSteps.step3.accountsTitle')}</h3>
          <div className="space-y-4">
            {bankAccountFields.map((account, index) => {
              const hasPoa = watchedBankAccounts?.[index]?.hasPowerOfAttorney;
              const firstAccountHasPoa = watchedBankAccounts?.[0]?.hasPowerOfAttorney;

              return (
                <div key={account.id} className="p-4 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 shadow-sm relative group">
                  <button
                    type="button"
                    onClick={() => removeBankAccount(index)}
                    className="absolute top-4 right-4 text-slate-300 dark:text-slate-400 hover:text-red-500 dark:hover:text-red-400"
                  >
                    <Trash2 size={20} />
                  </button>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    <div className="md:col-span-2">
                      <Input
                        label={t('wizardSteps.step3.bankName')}
                        {...register(`bankAccounts.${index}.bankName`)}
                        error={errors.bankAccounts?.[index]?.bankName?.message}
                        className="p-2.5"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Input
                        label={t('wizardSteps.step3.bankAddress')}
                        {...register(`bankAccounts.${index}.bankAddress`)}
                        error={errors.bankAccounts?.[index]?.bankAddress?.message}
                        className="p-2.5"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Input
                        label={t('wizardSteps.step3.accountHolder')}
                        {...register(`bankAccounts.${index}.accountHolder`)}
                        error={errors.bankAccounts?.[index]?.accountHolder?.message}
                        className="p-2.5"
                      />
                    </div>
                    <Input
                      label={t('wizardSteps.step3.iban')}
                      {...register(`bankAccounts.${index}.iban`)}
                      error={errors.bankAccounts?.[index]?.iban?.message}
                      className="p-2.5 font-mono"
                    />
                    <Input
                      label={t('wizardSteps.step3.bic')}
                      {...register(`bankAccounts.${index}.bic`)}
                      error={errors.bankAccounts?.[index]?.bic?.message}
                      className="p-2.5 font-mono"
                    />
                    <div className="md:col-span-2 mt-2 p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl border border-indigo-100 dark:border-indigo-900/50">
                      <label className="flex items-center gap-3 cursor-pointer mb-3">
                        <input
                          type="checkbox"
                          {...register(`bankAccounts.${index}.hasPowerOfAttorney`)}
                          className="w-5 h-5 rounded border-slate-300 dark:border-slate-600 text-indigo-600 dark:text-indigo-400 focus:ring-indigo-600 dark:focus:ring-indigo-400 dark:bg-slate-800"
                        />
                        <span className="text-sm font-medium text-indigo-900 dark:text-indigo-200">{t('wizardSteps.step3.createPoa')}</span>
                      </label>

                      {hasPoa && (
                        <div className="mt-4 border-t border-indigo-100 dark:border-indigo-900/50 pt-4">
                          <div className="flex items-center justify-between mb-4">
                            <div className="text-xs font-medium text-indigo-800 dark:text-indigo-300">{t('wizardSteps.step3.poaDataTitle')}</div>
                            {index > 0 && firstAccountHasPoa && (
                              <button
                                type="button"
                                onClick={() => {
                                  const first = getValues('bankAccounts.0');
                                  if (first) {
                                    setValue(`bankAccounts.${index}.poaFirstName`, first.poaFirstName || '', { shouldValidate: true, shouldDirty: true });
                                    setValue(`bankAccounts.${index}.poaLastName`, first.poaLastName || '', { shouldValidate: true, shouldDirty: true });
                                    setValue(`bankAccounts.${index}.poaAddress`, first.poaAddress || '', { shouldValidate: true, shouldDirty: true });
                                    setValue(`bankAccounts.${index}.poaBirthDate`, first.poaBirthDate || '', { shouldValidate: true, shouldDirty: true });
                                    setValue(`bankAccounts.${index}.poaPhone`, first.poaPhone || '', { shouldValidate: true, shouldDirty: true });
                                  }
                                }}
                                className="text-xs flex items-center gap-1.5 bg-white dark:bg-slate-800 border border-indigo-200 dark:border-indigo-800/50 text-indigo-700 dark:text-indigo-300 px-3 py-1.5 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors shadow-sm"
                              >
                                <Copy size={14} /> {t('wizardSteps.step3.copyFromFirst')}
                              </button>
                            )}
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                              label={t('wizardSteps.step1.firstName')}
                              {...register(`bankAccounts.${index}.poaFirstName`)}
                              error={errors.bankAccounts?.[index]?.poaFirstName?.message}
                              className="p-2.5 bg-white dark:bg-slate-800 !border-indigo-200 dark:!border-indigo-800/50"
                            />
                            <Input
                              label={t('wizardSteps.step1.lastName')}
                              {...register(`bankAccounts.${index}.poaLastName`)}
                              error={errors.bankAccounts?.[index]?.poaLastName?.message}
                              className="p-2.5 bg-white dark:bg-slate-800 !border-indigo-200 dark:!border-indigo-800/50"
                            />
                            <div className="md:col-span-2">
                              <Input
                                label={t('wizardSteps.step3.address')}
                                {...register(`bankAccounts.${index}.poaAddress`)}
                                error={errors.bankAccounts?.[index]?.poaAddress?.message}
                                className="p-2.5 bg-white dark:bg-slate-800 !border-indigo-200 dark:!border-indigo-800/50"
                              />
                            </div>
                            <Input
                              label={t('wizardSteps.step1.birthDate')}
                              type="date"
                              {...register(`bankAccounts.${index}.poaBirthDate`)}
                              error={errors.bankAccounts?.[index]?.poaBirthDate?.message}
                              className="p-2.5 bg-white dark:bg-slate-800 !border-indigo-200 dark:!border-indigo-800/50"
                            />
                            <Input
                              label={t('wizardSteps.step1.phone')}
                              {...register(`bankAccounts.${index}.poaPhone`)}
                              error={errors.bankAccounts?.[index]?.poaPhone?.message}
                              className="p-2.5 bg-white dark:bg-slate-800 !border-indigo-200 dark:!border-indigo-800/50"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
            <button
              type="button"
              onClick={() => appendBankAccount({
                id: crypto.randomUUID(),
                iban: '',
                bic: '',
                bankName: '',
                bankAddress: '',
                accountHolder: '',
                hasPowerOfAttorney: false,
                poaFirstName: '',
                poaLastName: '',
                poaAddress: '',
                poaBirthDate: '',
                poaPhone: ''
              })}
              className="w-full py-3 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl text-indigo-600 dark:text-indigo-400 font-medium flex items-center justify-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-800/50"
            >
              <Plus size={20} /> {t('wizardSteps.step3.addAccount')}
            </button>
          </div>
        </section>
        <section>
          <h3 className="text-lg font-medium text-slate-800 dark:text-slate-200 mb-4 border-b border-slate-100 dark:border-slate-800 pb-2">{t('wizardSteps.step3.assetsTitle')}</h3>
          <div className="space-y-4">
            {otherAssetFields.map((asset, index) => (
              <div key={asset.id} className="relative group">
                {asset.isHeading ? (
                  <div className="flex items-center gap-4 pt-4 pb-2 border-b border-slate-200 dark:border-slate-700">
                    <input
                      type="text"
                      {...register(`otherAssets.${index}.type`)}
                      placeholder={t('wizardSteps.step3.newHeading')}
                      className="text-lg font-semibold text-slate-800 dark:text-slate-200 bg-transparent outline-none w-full placeholder-slate-400 dark:placeholder-slate-500"
                    />
                    <button
                      type="button"
                      onClick={() => removeOtherAsset(index)}
                      className="text-slate-300 dark:text-slate-400 hover:text-red-500 dark:hover:text-red-400"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ) : (
                  <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 shadow-sm relative">
                    <button
                      type="button"
                      onClick={() => removeOtherAsset(index)}
                      className="absolute top-4 right-4 text-slate-300 dark:text-slate-400 hover:text-red-500 dark:hover:text-red-400"
                    >
                      <Trash2 size={20} />
                    </button>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                      <Input
                        label={t('wizardSteps.step3.assetType')}
                        {...register(`otherAssets.${index}.type`)}
                        error={errors.otherAssets?.[index]?.type?.message}
                        className="p-2.5"
                      />
                      <Input
                        label={t('wizardSteps.step3.assetDetails')}
                        {...register(`otherAssets.${index}.description`)}
                        error={errors.otherAssets?.[index]?.description?.message}
                        className="p-2.5"
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => appendOtherAsset({ id: crypto.randomUUID(), type: '', description: '', isHeading: false })}
                className="flex-1 py-3 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl text-indigo-600 dark:text-indigo-400 font-medium flex items-center justify-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-800/50"
              >
                <Plus size={20} /> {t('wizardSteps.step3.addAsset')}
              </button>
              <button
                type="button"
                onClick={() => appendOtherAsset({ id: crypto.randomUUID(), type: '', description: '', isHeading: true, title: '' })}
                className="flex-1 py-3 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl text-indigo-600 dark:text-indigo-400 font-medium flex items-center justify-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-800/50"
              >
                <Type size={20} /> {t('wizardSteps.step3.insertHeading')}
              </button>
            </div>
          </div>
        </section>
        <section>
          <h3 className="text-lg font-medium text-slate-800 dark:text-slate-200 mb-4 border-b border-slate-100 dark:border-slate-800 pb-2">{t('wizardSteps.step3.realEstateTitle')}</h3>
          <div className="space-y-4">
            {realEstateFields.map((estate, index) => (
              <div key={estate.id} className="p-4 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 shadow-sm relative group">
                <button
                  type="button"
                  onClick={() => removeRealEstate(index)}
                  className="absolute top-4 right-4 text-slate-300 dark:text-slate-400 hover:text-red-500 dark:hover:text-red-400"
                >
                  <Trash2 size={20} />
                </button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  <Input
                    label={t('wizardSteps.step3.realEstateType')}
                    {...register(`realEstates.${index}.type`)}
                    error={errors.realEstates?.[index]?.type?.message}
                    className="p-2.5"
                  />
                  <Input
                    label={t('wizardSteps.step3.country')}
                    {...register(`realEstates.${index}.country`)}
                    error={errors.realEstates?.[index]?.country?.message}
                    className="p-2.5"
                  />
                  <div className="md:col-span-2">
                    <Input
                      label={t('wizardSteps.step3.fullAddress')}
                      {...register(`realEstates.${index}.address`)}
                      error={errors.realEstates?.[index]?.address?.message}
                      className="p-2.5"
                    />
                  </div>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={() => appendRealEstate({ id: crypto.randomUUID(), type: '', address: '', country: '' })}
              className="w-full py-3 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl text-indigo-600 dark:text-indigo-400 font-medium flex items-center justify-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-800/50"
            >
              <Plus size={20} /> {t('wizardSteps.step3.addRealEstate')}
            </button>
          </div>
        </section>
        <section>
          <h3 className="text-lg font-medium text-slate-800 dark:text-slate-200 mb-4 border-b border-slate-100 dark:border-slate-800 pb-2">{t('wizardSteps.step3.vehiclesTitle')}</h3>
          <p className="text-slate-600 dark:text-slate-400 mb-4 text-sm">{t('wizardSteps.step3.vehiclesDesc')}</p>
          <div className="space-y-4">
            {vehicleFields.map((vehicle, index) => (
              <div key={vehicle.id} className="p-4 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 shadow-sm relative group">
                <button
                  type="button"
                  onClick={() => removeVehicle(index)}
                  className="absolute top-4 right-4 text-slate-300 dark:text-slate-400 hover:text-red-500 dark:hover:text-red-400"
                >
                  <Trash2 size={20} />
                </button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  <Input
                    label={t('wizardSteps.step3.vehicleType')}
                    {...register(`vehicles.${index}.type`)}
                    error={errors.vehicles?.[index]?.type?.message}
                    className="p-2.5"
                  />
                  <Input
                    label={t('wizardSteps.step3.licensePlate')}
                    {...register(`vehicles.${index}.licensePlate`)}
                    error={errors.vehicles?.[index]?.licensePlate?.message}
                    className="p-2.5"
                  />
                  <Input
                    label={t('wizardSteps.step3.vehicleInsurance')}
                    {...register(`vehicles.${index}.insurance`)}
                    error={errors.vehicles?.[index]?.insurance?.message}
                    className="p-2.5"
                  />
                  <Input
                    label={t('wizardSteps.step3.financing')}
                    {...register(`vehicles.${index}.financing`)}
                    error={errors.vehicles?.[index]?.financing?.message}
                    className="p-2.5"
                  />
                  <div className="md:col-span-2">
                    <Input
                      label={t('wizardSteps.step3.documentLocation')}
                      {...register(`vehicles.${index}.documentLocation`)}
                      error={errors.vehicles?.[index]?.documentLocation?.message}
                      className="p-2.5"
                    />
                  </div>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={() => appendVehicle({ id: crypto.randomUUID(), type: '', licensePlate: '', insurance: '', financing: '', documentLocation: '' })}
              className="w-full py-3 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl text-indigo-600 dark:text-indigo-400 font-medium flex items-center justify-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-800/50"
            >
              <Plus size={20} /> {t('wizardSteps.step3.addVehicle')}
            </button>
          </div>
          <div className="mt-4">
            <Input
              label={t('wizardSteps.step3.automotiveClubs')}
              {...register('automotiveClubs')}
              error={errors.automotiveClubs?.message}
              className="p-2.5"
            />
          </div>
        </section>
        <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
          <Textarea
            label={t('wizardSteps.step3.notesLabel')}
            description={t('wizardSteps.step3.notesDesc')}
            value={financeNotes || ''}
            onChange={(e) => setValue('financeNotes', e.target.value, { shouldValidate: true, shouldDirty: true })}
          />
        </div>
      </div>
    </div>
  );
}
