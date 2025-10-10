import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string;
  disabled?: boolean;
  type?: string;
  placeholder?: string;
  error?: string; // Prop for validation error message
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, className, type, placeholder, error, ...rest }, ref) => {
    return (
      <div className="flex flex-col">
        {label && <div className="w-30 mb-1 font-bold mr-4">{label}</div>}
        <input
          type={type}
          ref={ref}
          placeholder={placeholder}
          {...rest}
          className={`border border-border px-2 py-3 rounded-md ${
            className ?? ''
          } ${error ? 'border-red-500 border' : ''}`}
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}{' '}
        {/* Display error */}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
