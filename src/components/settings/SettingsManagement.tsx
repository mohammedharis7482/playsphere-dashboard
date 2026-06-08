"use client";

import { useState } from "react";

import SettingsStats from "./SettingsStats";
import SettingsSidebar from "./SettingsSidebar";
import ProfileSettings from "./ProfileSettings";
import BusinessSettings from "./BusinessSettings";
import SecuritySettings from "./SecuritySettings";
import NotificationSettings from "./NotificationSettings";
import AppearanceSettings from "./AppearanceSettings";
import SystemHealth from "./SystemHealth";
import RecentSettingsActivity from "./RecentSettingsActivity";

export type SettingsTab =
  | "profile"
  | "business"
  | "security"
  | "notifications"
  | "appearance";

export default function SettingsManagement() {
  const [activeTab, setActiveTab] =
    useState<SettingsTab>("profile");

  return (
    <div className="space-y-8">
      <SettingsStats />

      <SettingsSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <div className="space-y-6">
        {activeTab === "profile" && <ProfileSettings />}
        {activeTab === "business" && <BusinessSettings />}
        {activeTab === "security" && <SecuritySettings />}
        {activeTab === "notifications" && <NotificationSettings />}
        {activeTab === "appearance" && <AppearanceSettings />}

        <div className="grid gap-6 xl:grid-cols-2">
          <SystemHealth />
          <RecentSettingsActivity />
        </div>
      </div>
    </div>
  );
}