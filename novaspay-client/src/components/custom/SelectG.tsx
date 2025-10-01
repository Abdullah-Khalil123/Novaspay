import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface SelectProps<T> {
  label?: string;
  options: T[];
  className?: string;
  value?: T | null;
  onChange?: (val: T) => void;
  getOptionLabel?: (option: T) => string; // custom label renderer
}

function Select<T>({
  label,
  className,
  options,
  value,
  onChange,
  getOptionLabel = (opt) => String(opt), // default stringify
}: SelectProps<T>) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option: T) => {
    onChange?.(option);
    setIsOpen(false);
  };

  return (
    <div
      className={
        'flex items-center h-8 w-64 space-x-4 cursor-pointer ' +
        (className ? ` ${className}` : '')
      }
    >
      {/* Label */}
      {label && <p className="whitespace-nowrap">{label}</p>}

      {/* Main Select */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="relative border flex justify-between items-center border-border w-full px-2 py-1 rounded-sm"
      >
        <span>{value ? getOptionLabel(value) : 'Select an option'}</span>
        <ChevronDown
          size={16}
          className={`transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />

        {/* Options Dropdown */}
        {isOpen && (
          <div className="absolute top-0 left-0 mt-12 w-full z-10">
            {/* Small Triangle */}
            <div
              className="absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0 
  border-l-6 border-r-6 border-b-8 border-transparent border-b-border"
            ></div>

            {/* Options List */}
            <div className="bg-secondary border border-border rounded-sm max-h-60 overflow-y-auto">
              {options.map((option, idx) => (
                <div
                  key={idx}
                  className="px-2 py-1 hover:bg-border cursor-pointer"
                  onClick={() => handleSelect(option)}
                >
                  {getOptionLabel(option)}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Select;
