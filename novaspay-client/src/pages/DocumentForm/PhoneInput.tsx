import React, { useState } from 'react';

interface PhoneInputProps {
  label?: string;
  className?: string;
  register?: any; // from react-hook-form
  name?: string; // optional if register is not used
}

const PhoneInput: React.FC<PhoneInputProps> = ({
  label = 'Contact Number',
  className,
  register,
  name = 'contactNumber',
}) => {
  const [countryCode, setCountryCode] = useState('+92');
  const countryCodes = ['+92', '+1', '+44', '+61', '+86'];

  return (
    <div className={`flex flex-col w-full mt-2 ${className ?? ''}`}>
      {label && <label className="font-bold mb-1">{label}</label>}

      <div className="flex overflow-hidden rounded-md bg-[#f9f5f5]">
        {/* Country Code Selector */}
        <div className="flex items-center gap-1 bg-[#f9f5f5] px-3 py-2 border-r border-gray-200">
          <select
            value={countryCode}
            onChange={(e) => setCountryCode(e.target.value)}
            className="bg-transparent outline-none text-gray-700 text-sm appearance-none cursor-pointer"
          >
            {countryCodes.map((code) => (
              <option key={code} value={code}>
                {code}
              </option>
            ))}
          </select>
        </div>

        {/* Phone Input Field */}
        <input
          type="text"
          placeholder="34534534534"
          className="flex-1 bg-white px-2 py-3 outline-none text-gray-800 text-sm rounded-r-md"
          {...register(name)}
        />
      </div>
    </div>
  );
};

export default PhoneInput;
