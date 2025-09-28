const Button = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className="flex border border-border h-8 px-4 rounded-sm items-center cursor-pointer hover:bg-white hover:text-black transition">
      {children}
    </div>
  );
};

export default Button;
