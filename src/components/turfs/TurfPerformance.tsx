import {
    TrendingUp,
    Trophy,
    Target,
  } from "lucide-react";
  
  export default function TurfPerformance() {
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
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-900">
            Turf Performance
          </h2>
  
          <p className="mt-1 text-slate-500">
            Revenue and booking insights
          </p>
        </div>
  
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl bg-slate-50 p-5">
            <Trophy className="mb-3 text-yellow-500" />
  
            <p className="text-sm text-slate-500">
              Top Performing Turf
            </p>
  
            <h3 className="mt-2 text-xl font-bold">
              PlaySphere Arena
            </h3>
  
            <p className="mt-2 text-green-600 font-semibold">
              ₹48,000 Revenue
            </p>
          </div>
  
          <div className="rounded-2xl bg-slate-50 p-5">
            <TrendingUp className="mb-3 text-emerald-500" />
  
            <p className="text-sm text-slate-500">
              Growth Rate
            </p>
  
            <h3 className="mt-2 text-xl font-bold">
              +18%
            </h3>
  
            <p className="mt-2 text-slate-500">
              Compared to last month
            </p>
          </div>
  
          <div className="rounded-2xl bg-slate-50 p-5">
            <Target className="mb-3 text-blue-500" />
  
            <p className="text-sm text-slate-500">
              Occupancy Rate
            </p>
  
            <h3 className="mt-2 text-xl font-bold">
              84%
            </h3>
  
            <p className="mt-2 text-slate-500">
              Average utilisation
            </p>
          </div>
        </div>
      </div>
    );
  }