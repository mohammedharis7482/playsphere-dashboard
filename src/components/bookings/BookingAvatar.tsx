interface BookingAvatarProps {
  name: string;
}

export default function BookingAvatar({
  name,
}: BookingAvatarProps) {
  const initials = name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      className="
        flex
        h-10
        w-10
        shrink-0
        items-center
        justify-center
        rounded-full
        bg-[#0ACF65]
        text-sm
        font-bold
        text-white
      "
    >
      {initials}
    </div>
  );
}