function addMonths(date, months) {
  const d = new Date(date);
  const day = d.getDate();
  d.setMonth(d.getMonth() + months);
  // handle month rollover (e.g. Jan 31 -> Mar 3). clamp to last day of month
  if (d.getDate() < day) d.setDate(0);
  return d;
}

function startOfDay(date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

function monthsBetween(fromDate, toDate) {
  const from = startOfDay(fromDate);
  const to = startOfDay(toDate);
  if (to <= from) return 0;
  let months = (to.getFullYear() - from.getFullYear()) * 12;
  months += to.getMonth() - from.getMonth();
  // only count a month as passed if we've reached the same (or later) day-of-month
  if (to.getDate() < from.getDate()) months -= 1;
  return Math.max(0, months);
}

function computeDueDate(startDate, durationMonths) {
  if (!startDate) return null;
  const dur = Number(durationMonths || 0);
  if (!Number.isFinite(dur) || dur <= 0) return null;
  return addMonths(startDate, dur);
}

/**
 * Mutates the loan document in-memory:
 * - Applies missed monthly interest (compounded monthly)
 * - Updates totalInterestAccrued, remainingAmount, lastInterestAppliedDate
 * Returns { monthsApplied, updated }
 */
function applyMonthlyInterest(loan, now = new Date()) {
  const rate = Number(loan.interestRate || 0);
  if (!Number.isFinite(rate) || rate <= 0) return { monthsApplied: 0, updated: false };

  const status = loan.paymentStatus || (loan.status === "CLOSED" ? "paid" : "pending");
  if (status === "paid") return { monthsApplied: 0, updated: false };

  const last = loan.lastInterestAppliedDate || loan.startDate;
  if (!last) return { monthsApplied: 0, updated: false };

  const monthsPassed = monthsBetween(last, now);
  if (monthsPassed <= 0) return { monthsApplied: 0, updated: false };

  let remaining = Number(loan.remainingAmount ?? loan.outstandingAmount ?? 0);
  let accrued = Number(loan.totalInterestAccrued || 0);

  for (let i = 0; i < monthsPassed; i += 1) {
    const interest = (remaining * rate) / 100;
    remaining += interest;
    accrued += interest;
  }

  loan.remainingAmount = remaining;
  loan.outstandingAmount = remaining; // legacy mirror
  loan.totalInterestAccrued = accrued;
  loan.lastInterestAppliedDate = addMonths(last, monthsPassed);

  return { monthsApplied: monthsPassed, updated: true };
}

module.exports = { applyMonthlyInterest, computeDueDate, monthsBetween, addMonths };

