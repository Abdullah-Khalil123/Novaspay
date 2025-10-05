import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string;
  disabled?: boolean;
  type?: string;
  placeholder?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, className, type, placeholder, ...rest }, ref) => {
    return (
      <div className="flex flex-col">
        {label && <div className="w-30 mb-1 font-bold mr-4">{label}</div>}
        <input
          type={type}
          ref={ref}
          placeholder={placeholder}
          //   defaultValue={0}
          {...rest} // <-- spread register props here
          className={`bg-white px-2 py-3 text-gray-600 rounded-md ${
            className ?? ''
          }`}
        />
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
