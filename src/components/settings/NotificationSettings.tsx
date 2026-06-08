import {
  Bell,
  CreditCard,
  User,
  Wrench,
  Activity,
} from "lucide-react";

import SettingsCard from "./SettingsCard";
import SettingsToggle from "./SettingsToggle";
import SettingsSaveButton from "./SettingsSaveButton";

export default function NotificationSettings() {
  return (
    <SettingsCard
      title="Notification Settings"
      description="Choose which platform alerts should be enabled."
    >
      <div className="space-y-4">
        <SettingsToggle
          icon={Bell}
          title="New booking alerts"
          description="Notify admin when a booking is created."
          enabled
        />

        <SettingsToggle
          icon={CreditCard}
          title="Payment alerts"
          description="Notify admin about paid, failed and refunded payments."
          enabled
        />

        <SettingsToggle
          icon={User}
          title="New user registration"
          description="Notify admin when a new user joins."
        />

        <SettingsToggle
          icon={Wrench}
          title="Maintenance alerts"
          description="Notify admin when turf maintenance is updated."
          enabled
        />

        <SettingsToggle
          icon={Activity}
          title="System alerts"
          description="Notify admin about system status changes."
          enabled
        />
      </div>

      <SettingsSaveButton />
    </SettingsCard>
  );
}