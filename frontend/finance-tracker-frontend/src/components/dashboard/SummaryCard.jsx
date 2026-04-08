import React from "react";

const SummaryCards = ({ data }) => {
  const safeNumber = (num) => (num ?? 0).toLocaleString();

  const isNegativeSavings = data.savings < 0;

  const cards = [
    {
      title: "Total Balance",
      value: `₹${safeNumber(data.totalBalance)}`,
      bg: "bg-gradient-to-r from-blue-500 to-blue-600",
    },
    {
      title: "Total Income",
      value: `₹${safeNumber(data.income)}`,
      bg: "bg-gradient-to-r from-green-500 to-green-600",
    },
    {
      title: "Total Expense",
      value: `₹${safeNumber(data.expense)}`,
      bg: "bg-gradient-to-r from-red-500 to-red-600",
    },
    {
      title: "Savings",
      value: `₹${safeNumber(data.savings)}`,
      bg: isNegativeSavings
        ? "bg-gradient-to-r from-red-500 to-red-600"
        : "bg-gradient-to-r from-purple-500 to-purple-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 w-full max-w-full">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`${card.bg} text-white w-full p-3 md:p-6 rounded-lg md:rounded-2xl shadow-md md:shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}
        >
          <div className="flex flex-col gap-2 md:gap-4 leading-tight">
            <h3 className="text-xs md:text-sm font-medium opacity-90 tracking-wide">
              {card.title}
            </h3>
            <p className="text-xl md:text-3xl font-bold">{card.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;
