import React from 'react';

type CheckboxProps = {
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  size?: number; // size in px
  checkedColor?: string;
  className?: string;
  label?: string;
};

const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onChange,
  size = 18,
  checkedColor = '#60831a',
  className = '',
  label,
}) => {
  return (
    <label
      className={`relative inline-flex items-center cursor-pointer ${className}`}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        style={{ width: size, height: size }}
        className={`
          peer
          appearance-none
          rounded-[2px]
          border border-border
          bg-transparent
          checked:bg-sidebar-bg
          transition duration-200
        `}
      />
      {/* Tick */}
      <svg
        className="
          absolute
          hidden peer-checked:block
          pointer-events-none
        "
        style={{
          width: size,
          height: size,
          color: checkedColor,
          left: (size - size) / 2,
          top: (size - size) / 2,
        }}
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
      >
        <path d="M5 10l3 3 7-7" />
      </svg>
      {label && <span className="ml-2 text-text-primary">{label}</span>}
    </label>
  );
};

export default Checkbox;
