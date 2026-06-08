import { Inbox } from "lucide-react";

interface EmptyStateProps {
  title: string;
  description: string;
}

export default function EmptyState({
  title,
  description,
}: EmptyStateProps) {
  return (
    <div
      className="
        flex
        flex-col
        items-center
        justify-center
        py-20
      "
    >
      <Inbox
        size={60}
        className="
          text-slate-300
        "
      />

      <h3
        className="
          mt-4
          text-xl
          font-semibold
          text-slate-900
        "
      >
        {title}
      </h3>

      <p
        className="
          mt-2
          text-slate-500
        "
      >
        {description}
      </p>
    </div>
  );
}