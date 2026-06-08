import { Review } from "@/types/review";

interface Props {
  reviews: Review[];
}

export default function RatingDistribution({
  reviews,
}: Props) {
  const ratings = [5, 4, 3, 2, 1];

  return (
    <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-xl font-black text-slate-950">
        Rating Distribution
      </h3>

      <p className="mt-1 text-sm text-slate-500">
        Breakdown of customer rating scores.
      </p>

      <div className="mt-6 space-y-5">
        {ratings.map((rating) => {
          const count = reviews.filter(
            (review) => review.rating === rating
          ).length;

          const percentage =
            reviews.length === 0
              ? 0
              : Math.round((count / reviews.length) * 100);

          return (
            <div key={rating}>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-black text-slate-700">
                  {rating} Star
                </span>

                <span className="text-sm font-black text-slate-950">
                  {count}
                </span>
              </div>

              <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-emerald-500"
                  style={{
                    width: `${percentage}%`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}