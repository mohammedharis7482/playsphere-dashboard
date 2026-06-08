interface SectionHeaderProps {
    title: string;
    description?: string;
  }
  
  export default function SectionHeader({
    title,
    description,
  }: SectionHeaderProps) {
    return (
      <div>
        <h2 className="text-2xl font-bold text-slate-900">
          {title}
        </h2>
  
        {description && (
          <p className="mt-1 text-sm text-slate-500">
            {description}
          </p>
        )}
      </div>
    );
  }