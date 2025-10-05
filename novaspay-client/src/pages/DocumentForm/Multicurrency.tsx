import { ArrowLeft } from 'lucide-react';
import Dropdown from './DropDown';
import Input from './Input';

const MultiCurrency = ({
  //   nextStep,
  prevStep,
}: {
  nextStep: () => void;
  prevStep: () => void;
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
          <h2 className="text-2xl font-bold">Apply a Multicurrency Account</h2>
          <p className="text-gray-400">
            Please, provide the transaction informations.
          </p>

          <div className="flex mt-2 items-end justify-between w-[500px]">
            <div>
              <p className="font-bold mb-1">Headquaters</p>
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
                ]}
              />
            </div>
            <Input
              label={'State/Province'}
              className="w-53 font-sans"
              placeholder="State/Province"
            />
          </div>

          <div className="flex mt-2 justify-between mb-2">
            <Input label="City" placeholder="City" />
            <Input label="Street" placeholder="Street" />
          </div>
        </div>

        <button className="bg-sidebar-child text-white px-4 py-2 rounded-lg w-full mt-8">
          Next
        </button>
      </form>
    </div>
  );
};

export default MultiCurrency;
