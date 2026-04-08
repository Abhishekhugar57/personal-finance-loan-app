import React from "react";

const RecentTransactions = ({ transactions }) => {
  return (
    <>
      <h2 className="text-lg font-semibold mb-4">Recent Transactions</h2>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="text-gray-500 text-sm border-b">
            <tr>
              <th className="py-2">Date</th>
              <th>Category</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Note</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t) => (
              <tr key={t._id} className="border-b hover:bg-gray-50">
                <td className="py-2">
                  {new Date(t.transaction_date).toLocaleDateString()}
                </td>
                <td>{t.category_id?.name || "N/A"}</td>
                <td
                  className={
                    t.type === "income" ? "text-green-600" : "text-red-600"
                  }
                >
                  {t.type}
                </td>
                <td>₹{t.amount}</td>
                <td>{t.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default RecentTransactions;
