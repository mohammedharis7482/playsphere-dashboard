import { Check } from "lucide-react";

import SettingsCard from "./SettingsCard";
import SettingsInput from "./SettingsInput";
import SettingsSaveButton from "./SettingsSaveButton";

export default function AppearanceSettings() {
  return (
    <SettingsCard
      title="Appearance Settings"
      description="Control dashboard theme and brand preferences."
    >
      <div className="grid gap-4 md:grid-cols-3">
        <ThemeOption title="Light Mode" active />
        <ThemeOption title="Dark Mode" />
        <ThemeOption title="System Default" />
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <SettingsInput label="Brand Color" placeholder="#0ACF65" />
        <SettingsInput label="Dashboard Density" placeholder="Comfortable" />
      </div>

      <SettingsSaveButton />
    </SettingsCard>
  );
}

function ThemeOption({
  title,
  active = false,
}: {
  title: string;
  active?: boolean;
}) {
  return (
    <button
      className={`flex items-center justify-between rounded-3xl border p-5 text-left transition ${
        active
          ? "border-emerald-500 bg-emerald-50"
          : "border-slate-200 bg-slate-50 hover:bg-white"
      }`}
    >
      <div>
        <h4 className="font-black text-slate-950">
          {title}
        </h4>

        <p className="mt-1 text-xs text-slate-500">
          Dashboard appearance mode
        </p>
      </div>

      <div
        className={`flex h-7 w-7 items-center justify-center rounded-full ${
          active
            ? "bg-emerald-500 text-white"
            : "bg-white text-slate-300"
        }`}
      >
        {active && <Check size={16} />}
      </div>
    </button>
  );
}