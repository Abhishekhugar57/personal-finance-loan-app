import React, { useMemo } from "react";
import { CheckCircle2, Clock3, Percent, Wallet } from "lucide-react";

const formatINR = (n) =>
  `₹${Number(n || 0).toLocaleString(undefined, { maximumFractionDigits: 2 })}`;

const Badge = ({ children, tone = "gray" }) => {
  const tones = {
    gray: "bg-gray-100 text-gray-700",
    green: "bg-emerald-100 text-emerald-700",
    amber: "bg-amber-100 text-amber-700",
    blue: "bg-blue-100 text-blue-700",
    red: "bg-red-100 text-red-700",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${
        tones[tone] || tones.gray
      }`}
    >
      {children}
    </span>
  );
};

const LoanCard = ({ loan, onEdit, onDelete, onRepay }) => {
  const principal = Number(loan.amount ?? loan.principalAmount ?? 0);
  const remaining = Number(loan.remainingAmount ?? loan.outstandingAmount ?? 0);
  const interestAccrued = Number(loan.totalInterestAccrued ?? 0);

  const isPaid =
    loan.paymentStatus === "paid" ||
    loan.status === "CLOSED" ||
    remaining === 0;

  const dueMeta = useMemo(() => {
    if (!loan.dueDate) return { label: "No due date", overdue: false };
    const due = new Date(loan.dueDate);
    const today = new Date();
    const ms = due.setHours(0, 0, 0, 0) - today.setHours(0, 0, 0, 0);
    const days = Math.ceil(ms / (1000 * 60 * 60 * 24));
    if (days < 0) return { label: "Overdue", overdue: true, days: -days };
    if (days === 0) return { label: "Due today", overdue: false, days: 0 };
    return { label: `Due in ${days} days`, overdue: false, days };
  }, [loan.dueDate]);

  const repaid = principal - remaining;
  const progress =
    principal > 0 ? Math.min(100, Math.max(0, (repaid / principal) * 100)) : 0;

  return (
    <div className="w-full bg-white border border-gray-200 rounded-lg md:rounded-2xl shadow-sm hover:shadow-md transition-all p-3 sm:p-4 md:p-5 md:border-gray-100">
      <div className="flex items-start justify-between gap-2 md:gap-4">
        <div className="min-w-0">
          <p className="text-xs text-gray-500">
            {loan.type === "TAKEN" ? "Borrowed" : "Lent"}
          </p>
          <h3 className="mt-1 text-base md:text-lg font-semibold text-gray-900 truncate leading-tight">
            {loan.personName}
          </h3>
        </div>

        <div className="flex items-center gap-2">
          {isPaid ? (
            <Badge tone="green">
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 size={14} /> Paid
              </span>
            </Badge>
          ) : dueMeta.overdue ? (
            <Badge tone="red">
              <span className="inline-flex items-center gap-1">
                <Clock3 size={14} /> Overdue
              </span>
            </Badge>
          ) : (
            <Badge tone="amber">
              <span className="inline-flex items-center gap-1">
                <Clock3 size={14} /> Pending
              </span>
            </Badge>
          )}
        </div>
      </div>

      <div className="mt-2 md:mt-3 flex items-center justify-between">
        <p
          className={`text-xs font-medium ${
            isPaid
              ? "text-emerald-700"
              : dueMeta.overdue
                ? "text-red-700"
                : "text-gray-600"
          }`}
        >
          {isPaid ? "Paid" : dueMeta.label}
        </p>
        <p className="text-xs text-gray-500">
          Interest accrued: {formatINR(interestAccrued)}
        </p>
      </div>

      <div className="mt-2 md:mt-3">
        <div className="h-2 w-full rounded-full bg-gray-100 overflow-hidden border border-gray-100">
          <div
            className="h-full rounded-full bg-indigo-600"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="mt-1 flex justify-between text-[11px] md:text-xs text-gray-500 leading-tight">
          <span>Paid: {formatINR(repaid)}</span>
          <span>Remaining: {formatINR(remaining)}</span>
        </div>
      </div>

      <div className="mt-3 md:mt-4 grid grid-cols-2 gap-2">
        <div className="rounded-xl bg-gray-50 border border-gray-100 p-3">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Wallet size={14} /> Amount
          </div>
          <div className="mt-1 font-semibold text-gray-900">
            {formatINR(principal)}
          </div>
        </div>
        <div className="rounded-xl bg-gray-50 border border-gray-100 p-3">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Percent size={14} /> Interest
          </div>
          <div className="mt-1 font-semibold text-gray-900">
            {Number(loan.interestRate || 0)}% / month
          </div>
        </div>
        <div className="rounded-xl bg-gray-50 border border-gray-100 p-3">
          <div className="text-xs text-gray-500">Repaid</div>
          <div className="mt-1 font-semibold text-gray-900">
            {formatINR(repaid)}
          </div>
        </div>
        <div className="rounded-xl bg-gray-50 border border-gray-100 p-3">
          <div className="text-xs text-gray-500">Remaining</div>
          <div className="mt-1 font-semibold text-gray-900">
            {formatINR(remaining)}
          </div>
        </div>
      </div>

      <div className="mt-4 md:mt-5 flex items-center justify-end gap-2">
        {!isPaid ? (
          <button
            onClick={() => onRepay?.(loan)}
            className="px-3 py-2 rounded-xl bg-slate-900 text-xs sm:text-sm font-semibold text-white hover:bg-slate-800 transition"
          >
            {loan.type === "TAKEN" ? "Repay" : "Receive"}
          </button>
        ) : null}
        <button
          onClick={() => onEdit?.(loan)}
          className="px-3 py-2 rounded-xl border border-gray-200 text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete?.(loan)}
          className="px-3 py-2 rounded-xl bg-red-600 text-xs sm:text-sm font-semibold text-white hover:bg-red-700 transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default LoanCard;

