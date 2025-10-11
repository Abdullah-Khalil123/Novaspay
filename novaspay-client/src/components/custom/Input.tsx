import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string;
  disabled?: boolean;
  isError?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, className, isError, ...rest }, ref) => {
    return (
      <div className="flex items-center">
        {label && <div className="w-30 text-right mr-4">{label}</div>}
        <input
          ref={ref}
          defaultValue={0}
          {...rest} // <-- spread register props here
          className={`border h-8 pl-2 rounded-sm border-border-color disabled:bg-gray-600/20 ${
            className ?? ''
          } ${isError ? ' border-red-500/70' : ''}`}
        />
      </div>
    );
  }
);

Input.displayName = 'Input'; // required when using forwardRef

export default Input;
