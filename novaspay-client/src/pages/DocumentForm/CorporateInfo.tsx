import { ArrowLeft } from 'lucide-react';
import Dropdown from './DropDown'; // Renamed from DropDown to Dropdown for consistency
import Input from './Input';
import PhoneInput from './PhoneInput';
import type { DocumentFormData } from '@/types/documentForm';
import type {
  FieldErrors,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import { countriesWithCodes } from '@/utils/country';

const CorporateInfo = ({
  nextStep,
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
  getValues: UseFormGetValues<DocumentFormData>;
  watch: UseFormWatch<DocumentFormData>;
}) => {
  const watchedCountry = watch('country');
  console.log(watch('dateOfBirth'));
  console.log(new Date(watch('dateOfBirth')).toISOString().split('T')[0]);
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div>
        <div>
          <div
            className="mb-4 cursor-pointer border border-white rounded-full w-fit p-2"
            onClick={prevStep}
          >
            <ArrowLeft />
          </div>
          <h2 className="text-2xl font-bold">Corporate Info</h2>
          <p className="text-gray-400">Please provide a corporate info</p>

          <div className="flex mt-2 justify-between w-[500px]">
            <Input
              label={'Email'}
              placeholder="Email"
              {...register('email')}
              error={errors.email?.message} // Pass error
            />
            <Input
              label={'Date of birth'}
              className="w-53 font-sans"
              type="date"
              placeholder="DD/MM/YYYY"
              {...register('dateOfBirth')}
              error={errors.dateOfBirth?.message} // Pass error
            />
          </div>
          <div>
            <PhoneInput
              register={register}
              name="contactNumber"
              error={errors.contactNumber?.message}
            />{' '}
            {/* Pass name and error */}
          </div>

          {/* COMPANY INFORMATION */}
          <div className="mt-4">
            <h2 className="text-red-400 uppercase">Company Information</h2>
            <p className="font-bold">Country</p>
            <Dropdown
              className="max-w-53 my-2"
              options={countriesWithCodes.map((country) => ({
                label: country.name,
                value: country.code,
              }))}
              defaultValue={watchedCountry}
              onChange={(val) => {
                setValue('country', val);
              }}
              value={watchedCountry || ''}
              error={errors.country?.message}
            />
            <Input
              label="Address"
              placeholder="Address"
              {...register('address')}
              error={errors.address?.message} // Pass error
            />
          </div>

          {/* User Information */}
          <div className="mt-4">
            <h2 className="text-red-400 uppercase">USER INFORMATION</h2>
            <div className="flex justify-between mb-2">
              <Input
                label="First Name"
                placeholder="First Name"
                {...register('firstName')}
                error={errors.firstName?.message} // Pass error
              />
              <Input
                label="Middle Name"
                placeholder="Middle Name"
                {...register('middleName')}
                error={errors.middleName?.message} // Pass error
              />
            </div>
            <div className="flex justify-between mb-2">
              <Input
                label="Last Name"
                placeholder="Last Name"
                {...register('lastName')}
                error={errors.lastName?.message} // Pass error
              />
              <Input
                label="City Name"
                placeholder="City"
                {...register('city')}
                error={errors.city?.message} // Pass error
              />
            </div>
            <Input
              label="Postal Code"
              className="w-53"
              placeholder="Postal Code"
              {...register('postalCode')}
              error={errors.postalCode?.message} // Pass error
            />
          </div>
        </div>
        <button
          onClick={nextStep}
          type="submit" // Change to type="submit" so the form's onSubmit is triggered
          className="bg-sidebar-child text-white px-4 py-2 rounded-lg w-full mt-8"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CorporateInfo;
