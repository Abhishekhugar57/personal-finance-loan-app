import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const IncomeExpenseChart = ({ data }) => {
  const hasData =
    data && data.some((item) => item.income > 0 || item.expense > 0);

  const formatCurrency = (value) => `₹${value.toLocaleString()}`;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-800">
          Income vs Expense
        </h2>
        <span className="text-xs text-gray-400">Monthly comparison</span>
      </div>

      {!hasData ? (
        <div className="h-[300px] flex flex-col items-center justify-center text-gray-400 text-sm">
          <p>No financial activity yet</p>
          <p className="text-xs mt-1">
            Add transactions to visualize income and expenses.
          </p>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} barGap={8}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />

            <XAxis
              dataKey="month"
              tick={{ fill: "#64748b", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              tickFormatter={formatCurrency}
              tick={{ fill: "#64748b", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              formatter={(value) => formatCurrency(value)}
              contentStyle={{
                borderRadius: "12px",
                border: "none",
                boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
              }}
            />

            <Bar
              dataKey="income"
              fill="#22c55e"
              radius={[8, 8, 0, 0]}
              stroke="none"
              activeBar={false}
            />
            <Bar
              dataKey="expense"
              fill="#ef4444"
              radius={[8, 8, 0, 0]}
              stroke="none"
              activeBar={false}
            />
          </BarChart>
        </ResponsiveContainer>
      )}

      {/* Custom Legend */}
      <div className="flex gap-6 mt-4 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-green-500 rounded-full" />
          Income
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-red-500 rounded-full" />
          Expense
        </div>
      </div>
    </div>
  );
};

export default IncomeExpenseChart;
