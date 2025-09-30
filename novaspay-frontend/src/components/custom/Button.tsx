const Button = ({
  children,
  onClick,
}: {
  children?: React.ReactNode;
  onClick: () => void;
}) => {
  return (
    <div
      className="flex border border-border h-8 px-4 rounded-sm items-center cursor-pointer hover:bg-white hover:text-black transition"
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Button;
