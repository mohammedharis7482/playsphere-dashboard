interface Props {
  name: string;
}

export default function UserAvatar({ name }: Props) {
  const initials = name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-500 text-sm font-black text-white">
      {initials}
    </div>
  );
}