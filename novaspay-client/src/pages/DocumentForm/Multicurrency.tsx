import { ArrowLeft } from 'lucide-react';
import Dropdown from './DropDown';
import Input from './Input';
import { useTranslation } from 'react-i18next';
import type { DocumentFormData } from '@/types/documentForm';
import type {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';

const MultiCurrency = ({
  prevStep,
  register,
  errors,
  setValue,
  watch,
}: {
  nextStep: () => void;
  prevStep: () => void;
  register: UseFormRegister<DocumentFormData>;
  errors: FieldErrors<DocumentFormData>;
  setValue: UseFormSetValue<DocumentFormData>;
  watch: UseFormWatch<DocumentFormData>;
}) => {
  const { t } = useTranslation();

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div>
        <div
          className="mb-4 cursor-pointer border border-white rounded-full w-fit p-2"
          onClick={prevStep}
        >
          <ArrowLeft />
        </div>

        <h2 className="text-2xl font-bold">
          {t('Apply a Multicurrency Account')}
        </h2>
        <p className="text-gray-400">
          {t('Please, provide the transaction informations.')}
        </p>

        <div className="flex mt-2 items-end justify-between w-[500px]">
          <div>
            <p className="font-bold mb-1">{t('Headquarters Currency')}</p>
            <Dropdown
              className="min-w-53"
              options={[
                {
                  label: t('USD - United States Dollar'),
                  value: 'usd',
                },
                {
                  label: t('EUR - Euro'),
                  value: 'eur',
                },
                {
                  label: t('GBP - British Pound'),
                  value: 'gbp',
                },
              ]}
              onChange={(val) => {
                setValue('headquaters', val, {
                  shouldValidate: true,
                });
              }}
              value={watch('headquaters') || ''}
              error={errors.headquaters?.message}
            />
          </div>

          <Input
            label={t('State/Province')}
            className="w-53 font-sans"
            placeholder={t('State/Province')}
            {...register('state')}
            error={errors.state?.message}
          />
        </div>

        <div className="flex mt-2 justify-between mb-2">
          <Input
            label={t('City')}
            placeholder={t('City')}
            {...register('companyCity')}
            error={errors.companyCity?.message}
          />
          <Input
            label={t('Street')}
            placeholder={t('Street')}
            {...register('companyStreet')}
            error={errors.companyStreet?.message}
          />
        </div>
      </div>
    </div>
  );
};

export default MultiCurrency;
