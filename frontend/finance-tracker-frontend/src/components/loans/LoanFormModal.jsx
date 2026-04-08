import React, { useEffect, useMemo, useState } from "react";
import { X } from "lucide-react";

const toISODate = (d) => {
  if (!d) return "";
  const date = new Date(d);
  if (Number.isNaN(date.getTime())) return "";
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};

const LoanFormModal = ({
  open,
  mode = "add", // "add" | "edit"
  initialLoan,
  accounts,
  submitting,
  onClose,
  onSubmit,
}) => {
  const initial = useMemo(() => {
    if (mode === "edit" && initialLoan) {
      return {
        personName: initialLoan.personName ?? "",
        type: initialLoan.type ?? "TAKEN",
        principalAmount: initialLoan.principalAmount ?? "",
        accountId:
          initialLoan.accountId?._id ??
          initialLoan.accountId ??
          (accounts?.[0]?._id || ""),
        startDate: toISODate(initialLoan.startDate),
        interestRate: initialLoan.interestRate ?? 0,
        durationMonths: initialLoan.durationMonths ?? 12,
        status: initialLoan.status ?? "ACTIVE",
      };
    }
    return {
      personName: "",
      type: "TAKEN",
      principalAmount: "",
      accountId: accounts?.[0]?._id || "",
      startDate: toISODate(new Date()),
      interestRate: 0,
      durationMonths: 12,
      status: "ACTIVE",
    };
  }, [mode, initialLoan, accounts]);

  const [values, setValues] = useState(initial);
  const [touched, setTouched] = useState({});

  useEffect(() => {
    if (open) {
      setValues(initial);
      setTouched({});
    }
  }, [open, initial]);

  if (!open) return null;

  const errors = {};

  if (!values.personName.trim()) errors.personName = "Loan name is required";
  if (!values.accountId) errors.accountId = "Account is required";
  if (!values.startDate) errors.startDate = "Start date is required";

  const principalNum = Number(values.principalAmount);
  if (mode === "add") {
    if (!values.principalAmount && values.principalAmount !== 0)
      errors.principalAmount = "Amount is required";
    else if (!Number.isFinite(principalNum) || principalNum <= 0)
      errors.principalAmount = "Amount must be greater than 0";
  }

  const rateNum = Number(values.interestRate);
  if (!Number.isFinite(rateNum) || rateNum < 0 || rateNum > 100)
    errors.interestRate = "Interest must be between 0 and 100";

  const durationNum = Number(values.durationMonths);
  if (!Number.isFinite(durationNum) || durationNum < 1 || durationNum > 360)
    errors.durationMonths = "Duration must be between 1 and 360 months";

  const canSubmit = Object.keys(errors).length === 0 && !submitting;

  const setField = (key, val) => setValues((v) => ({ ...v, [key]: val }));
  const markTouched = (key) => setTouched((t) => ({ ...t, [key]: true }));

  const submit = (e) => {
    e.preventDefault();
    setTouched({
      personName: true,
      accountId: true,
      principalAmount: true,
      startDate: true,
      interestRate: true,
      status: true,
      type: true,
    });
    if (!canSubmit) return;

    const payload =
      mode === "add"
        ? {
            personName: values.personName.trim(),
            type: values.type,
            principalAmount: Number(values.principalAmount),
            accountId: values.accountId,
            startDate: values.startDate,
            interestRate: Number(values.interestRate || 0),
            durationMonths: Number(values.durationMonths || 12),
          }
        : {
            personName: values.personName.trim(),
            interestRate: Number(values.interestRate || 0),
            startDate: values.startDate,
            durationMonths: Number(values.durationMonths || 12),
            status: values.status,
          };

    onSubmit?.(payload);
  };

  const title = mode === "add" ? "Add loan" : "Edit loan";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
    >
      <button
        onClick={onClose}
        className="absolute inset-0 bg-black/40"
        aria-label="Close"
      />

      <div className="relative w-full max-w-xl rounded-xl md:rounded-2xl bg-white shadow-xl border border-gray-100 max-h-[85vh] md:max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-4 py-3 md:px-6 md:py-5 border-b border-gray-100">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
            <p className="text-sm text-gray-500">
              {mode === "add"
                ? "Create a new loan and track repayments."
                : "Update loan details."}
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">
                Loan name
              </label>
              <input
                value={values.personName}
                onChange={(e) => setField("personName", e.target.value)}
                onBlur={() => markTouched("personName")}
                placeholder="e.g. Car loan, John"
                className="mt-2 w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {touched.personName && errors.personName ? (
                <p className="mt-1 text-xs text-red-600">{errors.personName}</p>
              ) : null}
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Account
              </label>
              <select
                value={values.accountId}
                onChange={(e) => setField("accountId", e.target.value)}
                onBlur={() => markTouched("accountId")}
                disabled={mode === "edit"}
                className="mt-2 w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-50"
              >
                <option value="">Select an account</option>
                {accounts?.map((a) => (
                  <option key={a._id} value={a._id}>
                    {a.name} (₹{Number(a.balance || 0).toLocaleString()})
                  </option>
                ))}
              </select>
              {touched.accountId && errors.accountId ? (
                <p className="mt-1 text-xs text-red-600">{errors.accountId}</p>
              ) : null}
              {mode === "edit" ? (
                <p className="mt-1 text-xs text-gray-500">
                  Account can’t be changed after creation.
                </p>
              ) : null}
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Type</label>
              <select
                value={values.type}
                onChange={(e) => setField("type", e.target.value)}
                disabled={mode === "edit"}
                className="mt-2 w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-50"
              >
                <option value="TAKEN">Borrowed (Taken)</option>
                <option value="GIVEN">Lent (Given)</option>
              </select>
              {mode === "edit" ? (
                <p className="mt-1 text-xs text-gray-500">
                  Type can’t be changed after creation.
                </p>
              ) : null}
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Start date
              </label>
              <input
                type="date"
                value={values.startDate}
                onChange={(e) => setField("startDate", e.target.value)}
                onBlur={() => markTouched("startDate")}
                className="mt-2 w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {touched.startDate && errors.startDate ? (
                <p className="mt-1 text-xs text-red-600">{errors.startDate}</p>
              ) : null}
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Amount
              </label>
              <input
                inputMode="decimal"
                value={values.principalAmount}
                onChange={(e) => setField("principalAmount", e.target.value)}
                onBlur={() => markTouched("principalAmount")}
                disabled={mode === "edit"}
                placeholder="e.g. 50000"
                className="mt-2 w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-50"
              />
              {touched.principalAmount && errors.principalAmount ? (
                <p className="mt-1 text-xs text-red-600">
                  {errors.principalAmount}
                </p>
              ) : null}
              {mode === "edit" ? (
                <p className="mt-1 text-xs text-gray-500">
                  Amount can’t be changed after creation.
                </p>
              ) : null}
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Interest %
              </label>
              <input
                inputMode="decimal"
                value={values.interestRate}
                onChange={(e) => setField("interestRate", e.target.value)}
                onBlur={() => markTouched("interestRate")}
                placeholder="0"
                className="mt-2 w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {touched.interestRate && errors.interestRate ? (
                <p className="mt-1 text-xs text-red-600">
                  {errors.interestRate}
                </p>
              ) : null}
              <p className="mt-1 text-xs text-gray-500">
                Monthly interest rate (e.g. 2 = 2% per month)
              </p>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Duration (months)
              </label>
              <input
                inputMode="numeric"
                value={values.durationMonths}
                onChange={(e) => setField("durationMonths", e.target.value)}
                onBlur={() => markTouched("durationMonths")}
                placeholder="12"
                className="mt-2 w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {touched.durationMonths && errors.durationMonths ? (
                <p className="mt-1 text-xs text-red-600">
                  {errors.durationMonths}
                </p>
              ) : null}
            </div>

            {mode === "edit" ? (
              <div className="md:col-span-2">
                <label className="text-sm font-medium text-gray-700">
                  Status
                </label>
                <select
                  value={values.status}
                  onChange={(e) => setField("status", e.target.value)}
                  onBlur={() => markTouched("status")}
                  className="mt-2 w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="ACTIVE">Pending (Active)</option>
                  <option value="CLOSED">Paid (Closed)</option>
                </select>
              </div>
            ) : null}
          </div>

          <div className="flex items-center justify-end gap-2 pt-1 md:pt-2">
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
              className="px-4 py-2.5 rounded-xl bg-indigo-600 text-sm font-semibold text-white hover:bg-indigo-700 transition disabled:opacity-50 disabled:hover:bg-indigo-600"
            >
              {submitting ? "Saving..." : mode === "add" ? "Add loan" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoanFormModal;

