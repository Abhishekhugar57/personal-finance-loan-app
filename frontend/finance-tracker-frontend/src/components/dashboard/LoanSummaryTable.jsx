import React from "react";

const LoanSummaryTable = ({ loanSummary }) => {
  return (
    <>
      <h2 className="text-lg font-semibold mb-4">Loan Summary</h2>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
        <div>
          <p className="text-sm text-gray-500">Total Given</p>
          <p className="font-semibold">₹{loanSummary.totalGiven}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Total Taken</p>
          <p className="font-semibold">₹{loanSummary.totalTaken}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Outstanding</p>
          <p className="font-semibold">₹{loanSummary.totalOutstanding}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Active</p>
          <p className="font-semibold">{loanSummary.activeLoans}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Closed</p>
          <p className="font-semibold">{loanSummary.closedLoans}</p>
        </div>
      </div>
    </>
  );
};

export default LoanSummaryTable;
