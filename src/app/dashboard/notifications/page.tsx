import NotificationPageContent from "../../../components/notifications/NotificationPageContent";

export default function NotificationsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black tracking-tight text-slate-950">
          Notifications
        </h1>

        <p className="mt-2 text-sm font-medium text-slate-500">
          Monitor platform alerts, bookings, payments and system updates.
        </p>
      </div>

      <NotificationPageContent />
    </div>
  );
}