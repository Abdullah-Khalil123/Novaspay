import React, { useEffect, useRef, useState } from 'react';

interface DropdownProps {
  label?: string;
  options: { label: string; value: string }[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
  defaultValue?: string;
  disabled?: boolean;
  error?: string;
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
  const listRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [_, setSearchKey] = useState('');
  const [highlightIndex, setHighlightIndex] = useState<number | null>(null);

  // Handle select click
  const handleSelect = (val: string) => {
    onChange(val);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setTimeout(() => setIsOpen(false), 100);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Handle keyboard search
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyPress = (e: KeyboardEvent) => {
      if (!/^[a-zA-Z0-9]$/.test(e.key)) return;

      const newKey = e.key.toLowerCase();
      setSearchKey(newKey);

      // Find matching option
      const matchIndex = options.findIndex((opt) =>
        opt.label.toLowerCase().startsWith(newKey)
      );

      if (matchIndex !== -1 && listRef.current) {
        setHighlightIndex(matchIndex);

        const item = listRef.current.children[matchIndex] as HTMLElement;
        item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isOpen, options]);

  const selectedLabel =
    options.find((opt) => opt.value === value)?.label || 'Select';

  return (
    <div className="flex flex-col relative">
      {label && <div className="mb-1 font-bold">{label}</div>}
      <button
        ref={dropdownRef}
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={`border border-border px-3 py-3 rounded-md w-full text-left flex justify-between items-center ${
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
        <div
          ref={listRef}
          className="h-[300px] overflow-y-scroll absolute w-full top-full left-0 mt-1 bg-white rounded-md shadow-lg z-10"
        >
          {options.map((opt, i) => (
            <div
              key={opt.value}
              onClick={() => handleSelect(opt.value)}
              className={`px-3 py-2 hover:bg-gray-700/20 cursor-pointer ${
                value === opt.value ? 'bg-gray-700/10 font-medium' : ''
              } ${highlightIndex === i ? 'bg-gray-100' : ''}`}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default Dropdown;
