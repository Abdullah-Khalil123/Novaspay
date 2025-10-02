import { useState, useRef, useEffect, type ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';

interface DropdownProps {
  label: string | ReactNode;
  children: ReactNode;
  className?: string;
}

const Dropdown = ({ label, children, className }: DropdownProps) => {
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
        className="flex items-center gap-2 px-4 py-2 rounded-md shadow-sm"
      >
        {label}
        <ChevronDown
          className={`w-4 h-4 transition-transform ${
            open ? 'rotate-180' : 'rotate-0'
          }`}
        />
      </button>

      {/* Dropdown Content */}
      {open && (
        <div
          className="absolute bg-background mt-2 w-48 rounded-md shadow-lg z-50"
          onClick={handleOptionClick} // ⬅️ close when selecting any child
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
