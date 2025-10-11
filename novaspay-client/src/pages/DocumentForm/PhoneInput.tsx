import React, { useState, useEffect, useRef } from 'react';
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
  const initialValue = watch(name) || '';
  const initialCode =
    countryCodes.find((code) => initialValue.startsWith(code)) || '+92';
  const initialNumber = initialValue.replace(initialCode, '');

  const [countryCode, setCountryCode] = useState(initialCode);
  const [phoneNumber, setPhoneNumber] = useState(initialNumber);
  const [open, setOpen] = useState(false);
  const listRef = useRef<HTMLUListElement>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setValue(name, `${countryCode}${phoneNumber}` as any);
  }, [countryCode, phoneNumber, name, setValue]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (listRef.current && !listRef.current.contains(event.target as Node)) {
        const button = listRef.current.previousElementSibling;
        if (button && !button.contains(event.target as Node)) {
          setOpen(false);
          setSearchQuery('');
        }
      }
    };

    if (open) document.addEventListener('mousedown', handleClickOutside);
    else document.removeEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!open) return;
      const key = e.key;
      if (!/[0-9]/.test(key)) return;

      if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
      const newSearchQuery = searchQuery + key;
      setSearchQuery(newSearchQuery);

      searchTimeoutRef.current = setTimeout(() => {
        setSearchQuery('');
      }, 700);

      const foundIndex = countryCodes.findIndex((code) =>
        code.substring(1).startsWith(newSearchQuery)
      );
      if (foundIndex !== -1 && listRef.current) {
        const item = listRef.current.children[foundIndex] as HTMLElement;
        const container = listRef.current;
        const itemTop = item.offsetTop;
        const itemHeight = item.offsetHeight;
        const containerHeight = container.clientHeight;
        const scrollPosition = itemTop - containerHeight / 2 + itemHeight / 2;
        container.scrollTo({ top: scrollPosition, behavior: 'smooth' });
        setCountryCode(countryCodes[foundIndex]);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    };
  }, [open, searchQuery]);

  return (
    <div className={`flex flex-col w-full mt-2 ${className ?? ''}`}>
      {label && <label className="font-bold mb-3">{label}</label>}
      <div className="flex h-[50px] rounded-xl bg-white border border-gray-200 text-gray-700">
        <div className="relative w-28">
          <button
            type="button"
            onClick={() => {
              setOpen(!open);
              setSearchQuery('');
            }}
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
            <ul
              ref={listRef}
              className="absolute -translate-x-1/2 -right-full h-[200px] w-[150px] overflow-y-scroll bg-white border border-gray-200 rounded-md shadow-lg mt-1 z-[999]"
            >
              {countryCodes.map((code) => (
                <li
                  key={code}
                  onClick={() => {
                    setCountryCode(code);
                    setOpen(false);
                    setSearchQuery('');
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
        <input
          type="text"
          placeholder="34534534534"
          className="flex-1 px-3 py-2 outline-none text-gray-700 text-sm bg-white rounded-r-md"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default PhoneInput;
