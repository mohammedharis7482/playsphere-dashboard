interface Props {
    label: string;
    placeholder: string;
    type?: string;
  }
  
  export default function SettingsInput({
    label,
    placeholder,
    type = "text",
  }: Props) {
    return (
      <div>
        <label className="mb-2 block text-sm font-bold text-slate-700">
          {label}
        </label>
  
        <input
          type={type}
          placeholder={placeholder}
          className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-medium text-slate-700 outline-none transition focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
        />
      </div>
    );
  }