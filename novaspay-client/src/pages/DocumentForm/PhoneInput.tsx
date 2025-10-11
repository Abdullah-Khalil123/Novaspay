import React, { useState, useEffect } from 'react';
import type {
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import type { DocumentFormData } from '@/types/documentForm';
import { countryCodes } from '@/utils/number';

interface PhoneInputProps {
  label?: string;
  className?: string;
  register: UseFormRegister<DocumentFormData>;
  setValue: UseFormSetValue<DocumentFormData>;
  watch: UseFormWatch<DocumentFormData>;
  name: keyof DocumentFormData;
  error?: string;
}

const PhoneInput: React.FC<PhoneInputProps> = ({
  label = 'Contact Number',
  className,
  name,
  error,
  setValue,
  watch,
}) => {
  // Extract country code + number when editing
  const initialValue = watch(name) || '';
  const initialCode =
    countryCodes.find((code) => initialValue.startsWith(code)) || '+92';
  const initialNumber = initialValue.replace(initialCode, '');

  const [countryCode, setCountryCode] = useState(initialCode);
  const [phoneNumber, setPhoneNumber] = useState(initialNumber);
  const [open, setOpen] = useState(false);

  // Whenever code or number changes → update form value
  useEffect(() => {
    setValue(name, `${countryCode}${phoneNumber}` as any);
  }, [countryCode, phoneNumber, name, setValue]);

  return (
    <div className={`flex flex-col w-full mt-2 ${className ?? ''}`}>
      {label && <label className="font-bold mb-3">{label}</label>}

      <div className="flex h-[50px] rounded-xl bg-white border border-gray-200 text-gray-700">
        {/* Custom Dropdown */}
        <div className="relative w-28">
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="w-full h-full px-3 py-2 bg-gray-200 text-gray-700 text-sm flex justify-between items-center rounded-l-xl focus:outline-none"
          >
            <span>{countryCode}</span>
            <svg
              className={`w-4 h-4 transform transition-transform ${
                open ? 'rotate-180' : 'rotate-0'
              }`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {open && (
            <ul className="absolute -translate-x-1/2 -right-full h-[200px] w-[150px] overflow-y-scroll bg-white border border-gray-200 rounded-md shadow-lg mt-1 z-[999]">
              {countryCodes.map((code) => (
                <li
                  key={code}
                  onClick={() => {
                    setCountryCode(code);
                    setOpen(false);
                  }}
                  className={`px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 ${
                    code === countryCode ? 'bg-gray-50 font-semibold' : ''
                  }`}
                >
                  {code}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Phone Input Field */}
        <input
          type="text"
          placeholder="34534534534"
          className="flex-1 px-3 py-2 outline-none text-gray-700 text-sm bg-white rounded-r-md"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </div>

      {/* Validation Error */}
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default PhoneInput;
