"use client";

import {
  Bell,
  Building2,
  Moon,
  Shield,
  User,
} from "lucide-react";

import { SettingsTab } from "./SettingsManagement";

interface Props {
  activeTab: SettingsTab;
  setActiveTab: (tab: SettingsTab) => void;
}

const tabs = [
  {
    id: "profile",
    label: "Profile",
    description: "Admin account",
    icon: User,
  },
  {
    id: "business",
    label: "Business",
    description: "Platform details",
    icon: Building2,
  },
  {
    id: "security",
    label: "Security",
    description: "Access protection",
    icon: Shield,
  },
  {
    id: "notifications",
    label: "Notifications",
    description: "Alert preferences",
    icon: Bell,
  },
  {
    id: "appearance",
    label: "Appearance",
    description: "Theme and branding",
    icon: Moon,
  },
] as const;

export default function SettingsSidebar({
  activeTab,
  setActiveTab,
}: Props) {
  return (
    <div className="rounded-[32px] border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <h3 className="text-xl font-black text-slate-950">
            Settings Center
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Configure admin preferences and platform controls.
          </p>
        </div>

        <span className="w-fit rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700">
          Updated Today
        </span>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-5">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 rounded-2xl p-4 text-left transition ${
                isActive
                  ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20"
                  : "bg-slate-50 text-slate-600 hover:bg-slate-100"
              }`}
            >
              <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${
                  isActive
                    ? "bg-white/20 text-white"
                    : "bg-white text-slate-500"
                }`}
              >
                <Icon size={19} />
              </div>

              <div className="min-w-0">
                <p className="text-sm font-black">
                  {tab.label}
                </p>

                <p
                  className={`mt-0.5 truncate text-xs ${
                    isActive ? "text-white/80" : "text-slate-400"
                  }`}
                >
                  {tab.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}