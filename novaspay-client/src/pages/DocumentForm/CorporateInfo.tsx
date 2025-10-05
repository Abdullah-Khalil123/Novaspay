import { ArrowLeft } from 'lucide-react';
import DropDown from './DropDown';
import Input from './Input';
import PhoneInput from './PhoneInput';
import type { DocumentFormData } from '@/types/documentForm';
import type { UseFormRegister } from 'react-hook-form';

const CorporateInfo = ({
  nextStep,
  prevStep,
  register,
}: {
  nextStep: () => void;
  prevStep: () => void;
  register: UseFormRegister<DocumentFormData>;
}) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <form action="">
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
            <Input label={'Email'} placeholder="Email" {...register('email')} />
            <Input
              label={'Date of birth'}
              className="w-53 font-sans"
              type="date"
              placeholder="DD/MM/YYYY"
              {...register('dateOfBirth')}
            />
          </div>
          <div>
            <PhoneInput register={register} />
          </div>

          {/* COMPANY INFORMATION */}
          <div className="mt-4">
            <h2 className="text-red-400 uppercase">Company Information</h2>
            <p className="font-bold">Country</p>
            <DropDown
              className="max-w-53 my-2"
              options={[
                { label: 'LLC', value: 'llc' },
                { label: 'Corporation', value: 'corporation' },
              ]}
              onChange={(val) => {
                register('country').onChange({ target: { value: val } });
              }}
            />
            <Input label="Address" placeholder="Address" />
          </div>

          {/* User Information */}
          <div className="mt-4">
            <h2 className="text-red-400 uppercase">USER INFORMATION</h2>
            <div className="flex justify-between mb-2">
              <Input label="First Name" placeholder="First Name" />
              <Input label="Middle Name" placeholder="Middle Name" />
            </div>
            <div className="flex justify-between mb-2">
              <Input label="Last Name" placeholder="Last Name" />
              <Input label="City Name" placeholder="City" />
            </div>
            <Input
              label="Postal Code"
              className="w-53"
              placeholder="Postal Code"
            />
          </div>
        </div>
        <button
          onClick={() => {
            nextStep();
          }}
          className="bg-sidebar-child text-white px-4 py-2 rounded-lg w-full mt-8"
        >
          Next
        </button>
      </form>
    </div>
  );
};

export default CorporateInfo;
