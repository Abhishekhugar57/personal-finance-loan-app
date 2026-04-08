import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ["#6366f1", "#22c55e", "#f59e0b", "#ef4444", "#8b5cf6"];

const ExpensePie = ({ data }) => {
  const hasData = data && data.length > 0;

  const total = data?.reduce((acc, curr) => acc + curr.amount, 0) || 0;

  const formatCurrency = (value) => `₹${value.toLocaleString()}`;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200">
      <h2 className="text-lg font-semibold text-gray-800 mb-6">
        Expense Breakdown
      </h2>

      {!hasData ? (
        <div className="h-[300px] flex flex-col items-center justify-center text-gray-400 text-sm">
          <p>No expense data available</p>
          <p className="text-xs mt-1">
            Add expenses to see category distribution.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* Donut Chart */}
          <div className="relative h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  dataKey="amount"
                  nameKey="category"
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={3}
                  stroke="none"
                  activeShape={false}
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={COLORS[index % COLORS.length]}
                      stroke="none"
                    />
                  ))}
                </Pie>

                <Tooltip
                  formatter={(value) => formatCurrency(value)}
                  contentStyle={{
                    borderRadius: "12px",
                    border: "none",
                    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>

            {/* Center */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <p className="text-xs text-gray-400 uppercase tracking-wide">
                Total Spent
              </p>
              <p className="text-xl font-bold text-gray-800">
                {formatCurrency(total)}
              </p>
            </div>
          </div>

          {/* Legend */}
          <div className="space-y-3">
            {data.map((item, index) => {
              const percent = ((item.amount / total) * 100).toFixed(1);
              return (
                <div
                  key={index}
                  className="flex justify-between items-center text-sm"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="w-3 h-3 rounded-full"
                      style={{
                        backgroundColor: COLORS[index % COLORS.length],
                      }}
                    />
                    {item.category}
                  </div>
                  <div className="text-gray-600">{percent}%</div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpensePie;
