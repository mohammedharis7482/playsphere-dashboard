import SettingsCard from "./SettingsCard";
import SettingsInput from "./SettingsInput";
import SettingsSaveButton from "./SettingsSaveButton";

export default function BusinessSettings() {
  return (
    <SettingsCard
      title="Business Settings"
      description="Manage PlaySphere business details and booking defaults."
    >
      <div className="grid gap-4 md:grid-cols-2">
        <SettingsInput label="Business Name" placeholder="PlaySphere" />
        <SettingsInput label="Support Email" placeholder="support@playsphere.com" />
        <SettingsInput label="Currency" placeholder="INR - ₹" />
        <SettingsInput label="Location" placeholder="Calicut, Kerala" />
        <SettingsInput label="Opening Time" placeholder="06:00 AM" />
        <SettingsInput label="Closing Time" placeholder="11:00 PM" />
        <SettingsInput label="Timezone" placeholder="Asia/Kolkata" />
        <SettingsInput label="Slot Duration" placeholder="60 minutes" />
      </div>

      <SettingsSaveButton />
    </SettingsCard>
  );
}