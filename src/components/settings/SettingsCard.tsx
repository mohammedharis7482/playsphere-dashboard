interface Props {
  title: string;
  description: string;
  children: React.ReactNode;
}

export default function SettingsCard({
  title,
  description,
  children,
}: Props) {
  return (
    <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-2xl font-black tracking-tight text-slate-950">
          {title}
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          {description}
        </p>
      </div>

      {children}
    </div>
  );
}