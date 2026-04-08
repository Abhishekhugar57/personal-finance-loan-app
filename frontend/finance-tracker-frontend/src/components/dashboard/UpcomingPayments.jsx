import React from "react";

const UpcomingPayments = () => {
  return (
    <div className="bg-white p-5 rounded-xl shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Upcoming Payments</h2>

      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span>Car Loan EMI</span>
          <span className="text-red-500">₹8,500</span>
        </div>
        <div className="flex justify-between">
          <span>Credit Card Bill</span>
          <span className="text-red-500">₹4,000</span>
        </div>
      </div>
    </div>
  );
};

export default UpcomingPayments;
