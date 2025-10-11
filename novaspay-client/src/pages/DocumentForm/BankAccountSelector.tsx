import React from 'react';
import { useTranslation } from 'react-i18next';
import type { UseFormSetValue } from 'react-hook-form';
import type { DocumentFormData } from '@/types/documentForm';

interface BankAccountSelectorProps {
  nextStep: () => void;
  selected: string;
  setSelected: (val: string) => void;
  setValue: UseFormSetValue<DocumentFormData>;
  error?: string;
}

const BankAccountSelector: React.FC<BankAccountSelectorProps> = ({
  selected,
  setSelected,
  setValue,
  error,
  nextStep,
}) => {
  const { t } = useTranslation();

  const options = [
    {
      id: 1,
      title: 'Europe',
      currencies: ['EUR'],
      img: "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='128'%20height='128'%20viewBox='0%200%20512%20512'%3e%3cdefs%3e%3cg%20id='IconifyId196b2f4f26b7222a15'%3e%3cg%20id='IconifyId196b2f4f26b7222a16'%3e%3cpath%20id='IconifyId196b2f4f26b7222a17'%20d='m0-1l-.3%201l.5.1z'/%3e%3cuse%20href='%23IconifyId196b2f4f26b7222a17'%20transform='scale(-1%201)'/%3e%3c/g%3e%3cg%20id='IconifyId196b2f4f26b7222a18'%3e%3cuse%20href='%23IconifyId196b2f4f26b7222a16'%20transform='rotate(72)'/%3e%3cuse%20href='%23IconifyId196b2f4f26b7222a16'%20transform='rotate(144)'/%3e%3c/g%3e%3cuse%20href='%23IconifyId196b2f4f26b7222a18'%20transform='scale(-1%201)'/%3e%3c/g%3e%3c/defs%3e%3cpath%20fill='%23039'%20d='M0%200h512v512H0z'/%3e%3cg%20fill='%23fc0'%20transform='translate(256%20258.4)scale(25.28395)'%3e%3cuse%20width='100%25'%20height='100%25'%20y='-6'%20href='%23IconifyId196b2f4f26b7222a15'/%3e%3cuse%20width='100%25'%20height='100%25'%20y='6'%20href='%23IconifyId196b2f4f26b7222a15'/%3e%3cg%20id='IconifyId196b2f4f26b7222a19'%3e%3cuse%20width='100%25'%20height='100%25'%20x='-6'%20href='%23IconifyId196b2f4f26b7222a15'/%3e%3cuse%20width='100%25'%20height='100%25'%20href='%23IconifyId196b2f4f26b7222a15'%20transform='rotate(-144%20-2.3%20-2.1)'/%3e%3cuse%20width='100%25'%20height='100%25'%20href='%23IconifyId196b2f4f26b7222a15'%20transform='rotate(144%20-2.1%20-2.3)'/%3e%3cuse%20width='100%25'%20height='100%25'%20href='%23IconifyId196b2f4f26b7222a15'%20transform='rotate(72%20-4.7%20-2)'/%3e%3cuse%20width='100%25'%20height='100%25'%20href='%23IconifyId196b2f4f26b7222a15'%20transform='rotate(72%20-5%20.5)'/%3e%3c/g%3e%3cuse%20width='100%25'%20height='100%25'%20href='%23IconifyId196b2f4f26b7222a19'%20transform='scale(-1%201)'/%3e%3c/g%3e%3c/svg%3e",
      disabled: false,
    },
    {
      id: 2,
      title: 'EUR/USD-W',
      currencies: ['EUR', 'USD'],
      img: "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='128'%20height='128'%20viewBox='0%200%20512%20512'%3e%3cpath%20fill='%23bd3d44'%20d='M0%200h512v512H0'/%3e%3cpath%20stroke='%23fff'%20stroke-width='40'%20d='M0%2058h512M0%20137h512M0%20216h512M0%20295h512M0%20374h512M0%20453h512'/%3e%3cpath%20fill='%23192f5d'%20d='M0%200h390v275H0z'/%3e%3c/svg%3e",
      disabled: false,
    },
  ];

  const handleSelect = (title: string, disabled: boolean) => {
    if (disabled) return;
    setSelected(title);
    setValue('area', title, { shouldValidate: true });
  };

  return (
    <div className="flex text-black justify-center items-center h-full w-full">
      <div className="flex flex-col">
        <div>
          <h1 className="text-4xl font-semibold">
            {t('Select area to open bank account')}
          </h1>
          <p className="text-gray-600">
            {t('Please, let us know your primary location')}
          </p>
        </div>

        <div className="mt-6 flex flex-col gap-4 w-full max-w-md">
          {options.map((opt) => (
            <label
              key={opt.id}
              onClick={() => handleSelect(opt.title, opt.disabled)}
              className={`flex items-center gap-3 border rounded-lg p-4 cursor-pointer transition-colors ${
                opt.disabled
                  ? 'opacity-60 cursor-not-allowed'
                  : 'hover:bg-secondary/20'
              } ${
                selected === opt.title
                  ? 'border-sidebar-child border-dashed bg-secondary/10'
                  : 'border-gray-300'
              }`}
            >
              <div>
                <div className="flex gap-2 mb-2">
                  <img
                    src={opt.img}
                    className="rounded-lg"
                    alt={opt.title}
                    width={40}
                  />
                  <h2 className="text-lg font-bold">{opt.title}</h2>
                </div>
                <div className="text-left">
                  <h6 className="text-gray-500 text-sm mt-1">
                    {t('Available currencies')}
                  </h6>
                  <p className="text-sm mt-1">{opt.currencies.join(', ')}</p>
                </div>
              </div>
            </label>
          ))}
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          <button
            onClick={() => nextStep()}
            disabled={!selected}
            className={`mt-4 px-4 py-2 rounded-lg text-white ${
              selected
                ? 'bg-sidebar-child cursor-pointer'
                : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            {t('Next')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BankAccountSelector;
