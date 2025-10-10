const Button = ({
  children,
  className,
  onClick,
  type = 'button',
}: {
  type?: 'button' | 'submit' | 'reset';
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) => {
  return (
    <button
      type={type}
      className={
        'flex justify-center border border-border-color h-8 px-4 rounded-sm items-center cursor-pointer hover:bg-white hover:text-black transition ' +
        (className ? ` ${className}` : '')
      }
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
