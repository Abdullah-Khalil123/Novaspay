const Input = ({
  label,
  className,
  defaultValue,
  type = 'text',
}: {
  label: string;
  className?: string;
  defaultValue?: string;
  type?: string;
}) => {
  return (
    <div className={`flex items-center gap-4 `}>
      <p className="text-nowrap">{label}</p>
      <input
        defaultValue={defaultValue}
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
