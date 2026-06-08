import { Save } from "lucide-react";

export default function SettingsSaveButton() {
  return (
    <div className="mt-8 flex justify-end">
      <button className="flex h-12 items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-5 text-sm font-black text-white shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-600">
        <Save size={18} />
        Save Changes
      </button>
    </div>
  );
}