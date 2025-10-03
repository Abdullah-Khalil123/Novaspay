const Input = ({
  label,
  className,
  value,
  defaultValue,
  onChange,
  type = 'text',
}: {
  label: string;
  className?: string;
  value?: string | number;
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}) => {
  return (
    <div className={`flex items-center`}>
      {label && <div className="whitespace-nowrap pr-2">{label}</div>}
      <input
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        type={type}
        className={
          `border h-9 rounded-sm border-border` +
          (className ? ` ${className}` : '')
        }
      />
    </div>
  );
};

export default Input;
