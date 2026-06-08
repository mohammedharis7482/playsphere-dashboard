import UserManagement from "@/components/users/UserManagement";

export default function UsersPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black tracking-tight text-slate-950">
          Users
        </h1>

        <p className="mt-2 text-sm font-medium text-slate-500">
          Manage registered users, bookings and account status.
        </p>
      </div>

      <UserManagement />
    </div>
  );
}