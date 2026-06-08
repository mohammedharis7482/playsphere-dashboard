import SettingsManagement from "@/components/settings/SettingsManagement";

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black tracking-tight text-slate-950">
          Settings
        </h1>

        <p className="mt-2 text-sm font-medium text-slate-500">
          Manage platform preferences, security, notifications and business configuration.
        </p>
      </div>

      <SettingsManagement />
    </div>
  );
}