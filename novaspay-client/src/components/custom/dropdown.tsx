import { useState, useRef, useEffect, type ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';

interface DropdownProps {
  label: string | ReactNode;
  children: ReactNode;
  className?: string;
  showArrow?: boolean; // ⬅️ new prop to control arrow display
}

const Dropdown = ({
  label,
  children,
  className,
  showArrow = true,
}: DropdownProps) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleOptionClick = () => {
    setOpen(false);
  };

  return (
    <div
      ref={dropdownRef}
      className={`relative inline-block ${className || ''}`}
    >
      {/* Button / Trigger */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className={
          'flex cursor-pointer items-center gap-2 shadow-sm' +
          (showArrow ? ' px-2 rounded-md py-2' : ' h-full')
        }
      >
        {label}
        {showArrow && (
          <ChevronDown
            className={`w-4 h-4 transition-transform ${
              open ? 'rotate-180' : 'rotate-0'
            }`}
          />
        )}
      </button>

      {/* Dropdown Content */}
      {open && (
        <div
          className={
            'absolute bg-background mt-2 rounded-md shadow-lg z-50' +
            (showArrow ? '  w-48' : '')
          }
          onClick={handleOptionClick} // ⬅️ close when selecting any child
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
