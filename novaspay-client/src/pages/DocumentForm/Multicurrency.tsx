import { ArrowLeft } from 'lucide-react';
import Dropdown from './DropDown'; // Renamed
import Input from './Input';
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
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div>
        <div
          className="mb-4 cursor-pointer border border-white rounded-full w-fit p-2"
          onClick={prevStep}
        >
          <ArrowLeft />
        </div>
        <h2 className="text-2xl font-bold">Apply a Multicurrency Account</h2>
        <p className="text-gray-400">
          Please, provide the transaction informations.
        </p>

        <div className="flex mt-2 items-end justify-between w-[500px]">
          <div>
            <p className="font-bold mb-1">Headquarters Currency</p>{' '}
            {/* Changed label for clarity */}
            <Dropdown
              className="min-w-53"
              options={[
                {
                  label: 'USD - United States Dollar',
                  value: 'usd',
                },
                {
                  label: 'EUR - Euro',
                  value: 'eur',
                },
                {
                  label: 'GBP - British Pound',
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
            label={'State/Province'}
            className="w-53 font-sans"
            placeholder="State/Province"
            {...register('state')}
            error={errors.state?.message}
          />
        </div>

        <div className="flex mt-2 justify-between mb-2">
          <Input
            label="City"
            placeholder="City"
            {...register('companyCity')}
            error={errors.companyCity?.message}
          />
          <Input
            label="Street"
            placeholder="Street"
            {...register('companyStreet')}
            error={errors.companyStreet?.message}
          />
        </div>
      </div>
    </div>
  );
};

export default MultiCurrency;
