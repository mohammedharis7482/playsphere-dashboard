export default function TurfActivityFeed() {
    const activities = [
      {
        title: "New booking received",
        turf: "PlaySphere Arena",
        time: "2 mins ago",
      },
      {
        title: "Turf status updated",
        turf: "Elite Football Turf",
        time: "15 mins ago",
      },
      {
        title: "Revenue updated",
        turf: "Champion Cricket Ground",
        time: "1 hour ago",
      },
      {
        title: "New turf added",
        turf: "Badminton Arena",
        time: "Today",
      },
    ];
  
    return (
      <div
        className="
          rounded-3xl
          border border-slate-200
          bg-white
          p-6
          shadow-sm
        "
      >
        <h2 className="text-2xl font-bold text-slate-900">
          Recent Activity
        </h2>
  
        <p className="mt-1 text-slate-500">
          Latest turf updates
        </p>
  
        <div className="mt-6 space-y-4">
          {activities.map((activity, index) => (
            <div
              key={index}
              className="
                flex
                items-center
                justify-between
                rounded-2xl
                border
                border-slate-100
                p-4
              "
            >
              <div>
                <h4 className="font-semibold text-slate-900">
                  {activity.title}
                </h4>
  
                <p className="text-sm text-slate-500">
                  {activity.turf}
                </p>
              </div>
  
              <span className="text-sm text-slate-400">
                {activity.time}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }