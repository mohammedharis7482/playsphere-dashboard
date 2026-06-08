import { Star, Trophy } from "lucide-react";

export default function TopRatedTurfs() {
  const turfs = [
    {
      name: "PlaySphere Arena",
      location: "Calicut",
      rating: 4.8,
      reviews: 124,
    },
    {
      name: "Elite Football Turf",
      location: "Kochi",
      rating: 4.6,
      reviews: 98,
    },
    {
      name: "Champion Cricket Ground",
      location: "Malappuram",
      rating: 4.4,
      reviews: 86,
    },
  ];

  return (
    <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-black text-slate-950">
            Top Rated Turfs
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Best rated venues by customers.
          </p>
        </div>

        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-50 text-yellow-600">
          <Trophy size={22} />
        </div>
      </div>

      <div className="mt-6 space-y-4">
        {turfs.map((turf, index) => (
          <div
            key={turf.name}
            className="flex items-center justify-between rounded-3xl bg-slate-50 p-4"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-sm font-black text-slate-700">
                #{index + 1}
              </div>

              <div>
                <p className="font-black text-slate-950">
                  {turf.name}
                </p>

                <p className="mt-1 text-xs font-semibold text-slate-500">
                  {turf.location} · {turf.reviews} reviews
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 font-black text-yellow-600">
              <Star size={17} fill="currentColor" />
              {turf.rating}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}