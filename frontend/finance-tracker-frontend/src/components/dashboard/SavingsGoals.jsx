import React from "react";

const SavingsGoals = () => {
  return (
    <div className="bg-white p-5 rounded-xl shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Savings Goals</h2>

      <div className="space-y-4">
        <div>
          <p className="text-sm">Emergency Fund</p>
          <div className="w-full bg-gray-200 h-2 rounded-full mt-1">
            <div className="bg-blue-500 h-2 rounded-full w-3/4"></div>
          </div>
        </div>

        <div>
          <p className="text-sm">New Laptop</p>
          <div className="w-full bg-gray-200 h-2 rounded-full mt-1">
            <div className="bg-green-500 h-2 rounded-full w-1/2"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavingsGoals;
