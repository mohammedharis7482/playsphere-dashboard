type DashboardCardProps = {
    children: React.ReactNode;
    className?: string;
  };
  
  export default function DashboardCard({
    children,
    className = "",
  }: DashboardCardProps) {
    return (
      <div
        className={`
          rounded-[28px]
          border border-slate-200/70
          bg-white
          p-6
          shadow-sm
          transition-all duration-300
          hover:shadow-xl hover:shadow-slate-200/40
          ${className}
        `}
      >
        {children}
      </div>
    );
  }