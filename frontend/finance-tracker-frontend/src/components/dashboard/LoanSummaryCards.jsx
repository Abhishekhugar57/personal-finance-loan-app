import React, { useMemo } from "react";
import { Landmark, ReceiptIndianRupee, ShieldCheck, Wallet } from "lucide-react";
import SummaryCard from "../loans/SummaryCard";

const formatINR = (n) =>
  `₹${Number(n || 0).toLocaleString(undefined, { maximumFractionDigits: 2 })}`;

const LoanSummaryCards = ({ loans = [] }) => {
  const derived = useMemo(() => {
    const borrowed = loans.filter((l) => l.type === "TAKEN");
    const totalLoans = loans.length;
    const totalBorrowed = borrowed.reduce(
      (sum, l) => sum + Number(l.principalAmount || 0),
      0
    );
    const remaining = borrowed.reduce(
      (sum, l) => sum + Number(l.outstandingAmount || 0),
      0
    );
    const repaid = borrowed.reduce(
      (sum, l) =>
        sum +
        (Number(l.principalAmount || 0) - Number(l.outstandingAmount || 0)),
      0
    );
    return { totalLoans, totalBorrowed, remaining, repaid };
  }, [loans]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      <SummaryCard
        title="Total loans"
        value={derived.totalLoans.toLocaleString()}
        icon={Landmark}
        tone="slate"
      />
      <SummaryCard
        title="Total borrowed"
        value={formatINR(derived.totalBorrowed)}
        icon={Wallet}
        tone="blue"
      />
      <SummaryCard
        title="Total repaid"
        value={formatINR(derived.repaid)}
        icon={ShieldCheck}
        tone="green"
      />
      <SummaryCard
        title="Remaining balance"
        value={formatINR(derived.remaining)}
        icon={ReceiptIndianRupee}
        tone="amber"
      />
    </div>
  );
};

export default LoanSummaryCards;

