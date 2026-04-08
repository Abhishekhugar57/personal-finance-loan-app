import React, { useEffect, useState } from "react";
import { X } from "lucide-react";

const RepayLoanModal = ({ open, loan, submitting, onClose, onSubmit }) => {
  const [amount, setAmount] = useState("");
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if (open) {
      setAmount("");
      setTouched(false);
    }
  }, [open]);

  if (!open || !loan) return null;

  const remaining = Number(loan.outstandingAmount || 0);
  const numeric = Number(amount);
  let error = "";
  if (!amount) error = "Amount is required";
  else if (!Number.isFinite(numeric) || numeric <= 0) error = "Invalid amount";
  else if (numeric > remaining) error = "Amount exceeds remaining balance";

  const canSubmit = !error && !submitting;

  const submit = (e) => {
    e.preventDefault();
    setTouched(true);
    if (!canSubmit) return;
    onSubmit?.(numeric);
  };

  const title =
    loan.type === "TAKEN" ? "Record repayment" : "Record received payment";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-4">
      <button
        onClick={onClose}
        className="absolute inset-0 bg-black/40"
        aria-label="Close"
      />
      <div className="relative w-full max-w-lg rounded-xl md:rounded-2xl bg-white shadow-xl border border-gray-100 max-h-[85vh] md:max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-4 py-3 md:px-6 md:py-5 border-b border-gray-100">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
            <p className="text-sm text-gray-500">
              Remaining: ₹{remaining.toLocaleString()}
            </p>
          </div>
          <button
            onClick={onClose}
            className="h-10 w-10 rounded-xl hover:bg-gray-50 flex items-center justify-center transition"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        <form
          onSubmit={submit}
          className="p-4 space-y-3 md:p-6 md:space-y-5"
        >
          <div>
            <label className="text-sm font-medium text-gray-700">Amount</label>
            <input
              inputMode="decimal"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              onBlur={() => setTouched(true)}
              placeholder="e.g. 2500"
              className="mt-2 w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {touched && error ? (
              <p className="mt-1 text-xs text-red-600">{error}</p>
            ) : null}
          </div>

          <div className="flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!canSubmit}
              className="px-4 py-2.5 rounded-xl bg-indigo-600 text-sm font-semibold text-white hover:bg-indigo-700 transition disabled:opacity-50"
            >
              {submitting ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RepayLoanModal;

