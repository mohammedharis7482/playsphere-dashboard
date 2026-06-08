"use client";

import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import { Payment } from "@/types/payment";

interface Props {
  payments: Payment[];
}

const COLORS = ["#0ACF65", "#3B82F6", "#F59E0B", "#8B5CF6"];

export default function PaymentMethodChart({ payments }: Props) {
  const methods = ["UPI", "Card", "Cash", "Wallet"];

  const methodData = methods.map((method) => {
    const total = payments
      .filter((payment) => payment.method === method)
      .reduce((sum, payment) => sum + payment.amount, 0);

    return {
      method,
      amount: total,
      count: payments.filter((payment) => payment.method === method).length,
    };
  });

  const totalAmount = methodData.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-xl font-black text-slate-950">
        Payment Methods
      </h3>

      <p className="mt-1 text-sm text-slate-500">
        Revenue by payment method
      </p>

      <div className="mt-6 h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={methodData}
              dataKey="amount"
              nameKey="method"
              innerRadius={58}
              outerRadius={88}
              paddingAngle={5}
            >
              {methodData.map((item, index) => (
                <Cell key={item.method} fill={COLORS[index]} />
              ))}
            </Pie>

            <Tooltip
              formatter={(value) => [
                `₹${Number(value).toLocaleString()}`,
                "Amount",
              ]}
              contentStyle={{
                border: "1px solid #E2E8F0",
                borderRadius: "16px",
                boxShadow: "0 12px 30px rgba(15,23,42,0.08)",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-5 space-y-3">
        {methodData.map((item, index) => {
          const percentage = totalAmount
            ? Math.round((item.amount / totalAmount) * 100)
            : 0;

          return (
            <div
              key={item.method}
              className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3"
            >
              <div className="flex items-center gap-3">
                <span
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: COLORS[index] }}
                />

                <div>
                  <p className="text-sm font-black text-slate-950">
                    {item.method}
                  </p>

                  <p className="text-xs text-slate-500">
                    {item.count} payments · {percentage}% share
                  </p>
                </div>
              </div>

              <p className="text-sm font-black text-emerald-600">
                ₹{item.amount.toLocaleString()}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}