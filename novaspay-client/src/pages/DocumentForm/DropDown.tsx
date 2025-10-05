import React, { useRef, useState } from 'react';

interface DropdownProps {
  label?: string;
  options: { label: string; value: string }[];
  value: string; // Make value required to be controlled
  onChange: (value: string) => void; // Make onChange required
  className?: string;
  defaultValue?: string;
  disabled?: boolean;
  error?: string; // Prop for validation error message
}

const Dropdown: React.FC<DropdownProps> = ({
  label,
  options,
  value,
  onChange,
  className,
  disabled = false,
  error,
}) => {
  const dropdownRef = useRef<HTMLButtonElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (val: string) => {
    onChange(val);
    setIsOpen(false);
  };

  //   useEffect(() => {
  //     const handleClickOutside = (event: MouseEvent) => {
  //       if (
  //         dropdownRef.current &&
  //         !dropdownRef.current.contains(event.target as Node)
  //       ) {
  //         setIsOpen(false);
  //       }
  //     };

  //     if (isOpen) {
  //       document.addEventListener('mousedown', handleClickOutside);
  //     } else {
  //       document.removeEventListener('mousedown', handleClickOutside);
  //     }

  //     return () => document.removeEventListener('mousedown', handleClickOutside);
  //   }, [isOpen]);

  const selectedLabel =
    options.find((opt) => opt.value === value)?.label || 'Select';

  return (
    <div className="flex flex-col relative">
      {label && <div className="mb-1 font-bold">{label}</div>}
      <button
        ref={dropdownRef}
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={`bg-white text-gray-600 px-3 py-3 rounded-md w-full text-left flex justify-between items-center ${
          disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'
        } ${className ?? ''} ${error ? 'border-red-500 border' : ''}`}
      >
        <span>{selectedLabel}</span>
        <svg
          className={`w-4 h-4 transition-transform ${
            isOpen ? 'rotate-180' : 'rotate-0'
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
      {isOpen && (
        <div className="absolute w-full top-full left-0 mt-1 bg-white rounded-md shadow-lg z-10">
          {options.map((opt) => (
            <div
              key={opt.value}
              onClick={() => handleSelect(opt.value)}
              className={`px-3 py-2 hover:bg-gray-100 cursor-pointer ${
                value === opt.value ? 'bg-gray-50 font-medium' : ''
              }`}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}{' '}
      {/* Display error */}
    </div>
  );
};

export default Dropdown;
