import { UserStatus } from "@/types/user";

interface Props {
  status: UserStatus;
}

export default function UserStatusBadge({ status }: Props) {
  const style =
    status === "Active"
      ? "bg-emerald-100 text-emerald-700"
      : "bg-red-100 text-red-700";

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-black ${style}`}>
      {status}
    </span>
  );
}