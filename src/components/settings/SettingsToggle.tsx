"use client";

import { useState } from "react";

interface Props {
  icon: React.ElementType;
  title: string;
  description: string;
  enabled?: boolean;
}

export default function SettingsToggle({
  icon: Icon,
  title,
  description,
  enabled = false,
}: Props) {
  const [active, setActive] = useState(enabled);

  return (
    <div className="flex items-center justify-between gap-4 rounded-3xl bg-slate-50 p-4">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
          <Icon size={20} />
        </div>

        <div>
          <h4 className="text-sm font-black text-slate-950">
            {title}
          </h4>

          <p className="mt-1 text-sm text-slate-500">
            {description}
          </p>
        </div>
      </div>

      <button
        onClick={() => setActive(!active)}
        className={`relative h-7 w-12 rounded-full transition ${
          active ? "bg-emerald-500" : "bg-slate-300"
        }`}
      >
        <span
          className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${
            active ? "left-6" : "left-1"
          }`}
        />
      </button>
    </div>
  );
}