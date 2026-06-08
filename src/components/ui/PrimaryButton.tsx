type PrimaryButtonProps = {
    children: React.ReactNode;
    className?: string;
  };
  
  export default function PrimaryButton({
    children,
    className = "",
  }: PrimaryButtonProps) {
    return (
      <button
        className={`
          inline-flex items-center justify-center
          rounded-2xl
          bg-green-500
          px-5 py-3
          text-sm font-semibold text-white
          shadow-lg shadow-green-500/20
          transition-all duration-300
          hover:-translate-y-0.5
          hover:bg-green-600
          hover:shadow-xl hover:shadow-green-500/30
          active:scale-[0.98]
          ${className}
        `}
      >
        {children}
      </button>
    );
  }