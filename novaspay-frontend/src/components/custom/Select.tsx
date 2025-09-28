import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

const Select = ({ label, options }: { label: string; options: string[] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="flex items-center h-8 w-64 space-x-4 cursor-pointer">
      {/* Label */}
      <p className="text-nowrap">{label}</p>

      {/* Main Select */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="relative border flex justify-between items-center border-border w-full px-2 py-1 rounded-sm"
      >
        <span>{selected || options[0] || 'Select an option'}</span>
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
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-6 border-r-6 border-b-8 border-transparent border-b-border"></div>

            {/* Options List */}
            <div className="bg-secondary border border-border rounded-sm max-h-60 overflow-y-auto">
              {options.map((option) => (
                <div
                  key={option}
                  className="px-2 py-1 hover:bg-border-border cursor-pointer"
                  onClick={() => {
                    setSelected(option);
                    setIsOpen(false);
                  }}
                >
                  {option}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Select;
