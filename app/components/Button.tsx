type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  isLoading?: boolean;
  color?: 'green' | 'brown';
};

const colorStyles = {
  green: 'bg-lime-600 hover:bg-lime-700 shadow-lime-800/20',
  brown: 'bg-wood-600 hover:bg-wood-700 shadow-wood-800/20',
};

const Button = ({ children, isLoading, color = 'brown', ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className={`cursor-pointer items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm active:scale-95 text-white w-full text-sm sm:text-md md:text-xl ${colorStyles[color]}`}
      disabled={isLoading || props.disabled}
    >
      {children}
    </button>
  );
};

export default Button;
