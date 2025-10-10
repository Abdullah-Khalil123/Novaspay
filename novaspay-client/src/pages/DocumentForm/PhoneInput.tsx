import React, { useState } from 'react';
import type { UseFormRegister } from 'react-hook-form'; // Import FieldError
import type { DocumentFormData } from '@/types/documentForm';

interface PhoneInputProps {
  label?: string;
  className?: string;
  register: UseFormRegister<DocumentFormData>; // Ensure register is always passed
  name: keyof DocumentFormData; // Use keyof DocumentFormData for name
  error?: string; // Prop for validation error message
}

const PhoneInput: React.FC<PhoneInputProps> = ({
  label = 'Contact Number',
  className,
  register,
  name,
  error,
}) => {
  const [countryCode, setCountryCode] = useState('+92');
  const countryCodes = ['+92', '+1', '+44', '+61', '+86'];

  // You might want to register the country code as well if it's part of your schema
  // For now, it's handled locally.

  return (
    <div className={`flex flex-col w-full mt-2 ${className ?? ''}`}>
      {label && <label className="font-bold mb-1">{label}</label>}
      <div className="flex overflow-hidden rounded-md border border-border">
        {/* Country Code Selector */}
        <div className="flex items-center gap-1 px-3 py-2 border-r border-border">
          <select
            value={countryCode}
            onChange={(e) => setCountryCode(e.target.value)}
            className="bg-transparent outline-none text-sm appearance-none cursor-pointer"
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
          className="flex-1 px-2 py-3 outline-none text-gray-400 text-sm rounded-r-md"
          {...register(name)} // Register the phone number field
        />
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}{' '}
      {/* Display error */}
    </div>
  );
};

export default PhoneInput;
