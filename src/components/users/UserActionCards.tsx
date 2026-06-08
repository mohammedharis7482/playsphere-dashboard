import {
    UserPlus,
    Shield,
    Download,
    Users,
  } from "lucide-react";
  
  export default function UserActionCards() {
    const cards = [
      {
        title: "Add User",
        subtitle: "Create new account",
        color: "bg-emerald-500",
        icon: UserPlus,
      },
      {
        title: "Active Users",
        subtitle: "View active users",
        color: "bg-blue-500",
        icon: Users,
      },
      {
        title: "Blocked Users",
        subtitle: "Manage restrictions",
        color: "bg-red-500",
        icon: Shield,
      },
      {
        title: "Export",
        subtitle: "Download report",
        color: "bg-purple-500",
        icon: Download,
      },
    ];
  
    return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;
  
          return (
            <div
              key={card.title}
              className={`${card.color} rounded-3xl p-6 text-white`}
            >
              <Icon size={24} />
  
              <h3 className="mt-4 text-xl font-bold">
                {card.title}
              </h3>
  
              <p className="mt-1 text-white/80">
                {card.subtitle}
              </p>
            </div>
          );
        })}
      </div>
    );
  }