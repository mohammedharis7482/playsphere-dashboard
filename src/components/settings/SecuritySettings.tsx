import { Lock, Shield } from "lucide-react";

import SettingsCard from "./SettingsCard";
import SettingsInput from "./SettingsInput";
import SettingsToggle from "./SettingsToggle";
import SettingsSaveButton from "./SettingsSaveButton";

export default function SecuritySettings() {
  return (
    <SettingsCard
      title="Security Settings"
      description="Manage password, login alerts and admin protection."
    >
      <div className="grid gap-4 md:grid-cols-3">
        <SettingsInput
          label="Current Password"
          placeholder="••••••••"
          type="password"
        />

        <SettingsInput
          label="New Password"
          placeholder="••••••••"
          type="password"
        />

        <SettingsInput
          label="Confirm Password"
          placeholder="••••••••"
          type="password"
        />
      </div>

      <div className="mt-6 space-y-4">
        <SettingsToggle
          icon={Lock}
          title="Two-factor authentication"
          description="Add extra security to admin login."
          enabled
        />

        <SettingsToggle
          icon={Shield}
          title="Login alerts"
          description="Notify admin on new login activity."
          enabled
        />
      </div>

      <SettingsSaveButton />
    </SettingsCard>
  );
}