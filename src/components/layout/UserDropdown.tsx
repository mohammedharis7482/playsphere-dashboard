type Props = {
  open: boolean;
};

export default function UserDropdown({ open }: Props) {
  if (!open) return null;

  return (
    <div
      className="
        absolute right-0 top-16 z-50
        w-64
        rounded-3xl
        border border-slate-200
        bg-white
        shadow-xl
        overflow-hidden
      "
    >
      <div className="border-b border-slate-100 p-5">
        <h3 className="font-bold text-slate-900">
          Mohammed Haris
        </h3>

        <p className="text-sm text-slate-500">
          Super Admin
        </p>
      </div>

      <div className="p-2">
        <button
          className="
            w-full rounded-xl px-4 py-3
            text-left text-sm
            text-slate-700
            hover:bg-slate-100
          "
        >
          My Profile
        </button>

        <button
          className="
            w-full rounded-xl px-4 py-3
            text-left text-sm
            text-slate-700
            hover:bg-slate-100
          "
        >
          Settings
        </button>

        <button
          className="
            w-full rounded-xl px-4 py-3
            text-left text-sm
            text-slate-700
            hover:bg-slate-100
          "
        >
          Help Center
        </button>

        <hr className="my-2" />

        <button
          className="
            w-full rounded-xl px-4 py-3
            text-left text-sm
            font-medium
            text-red-600
            hover:bg-red-50
          "
        >
          Logout
        </button>
      </div>
    </div>
  );
}
  