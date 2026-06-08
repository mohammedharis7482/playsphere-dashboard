import { ShieldCheck } from "lucide-react";

import SettingsCard from "./SettingsCard";
import SettingsInput from "./SettingsInput";
import SettingsSaveButton from "./SettingsSaveButton";

export default function ProfileSettings() {
  return (
    <div className="space-y-6">
      <SettingsCard
        title="Profile Settings"
        description="Update your admin profile information."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <SettingsInput label="Full Name" placeholder="Mohammed Haris" />
          <SettingsInput label="Email Address" placeholder="mohammedharisar@gmail.com" />
          <SettingsInput label="Phone Number" placeholder="+91 9876543210" />
          <SettingsInput label="Role" placeholder="Super Admin" />
        </div>

        <SettingsSaveButton />
      </SettingsCard>

      <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-emerald-500 text-lg font-black text-white">
              MH
            </div>

            <div>
              <h3 className="text-xl font-black text-slate-950">
                Mohammed Haris
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Super Admin · Last login today
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-black text-emerald-700">
            <ShieldCheck size={18} />
            Active Account
          </div>
        </div>
      </div>
    </div>
  );
}