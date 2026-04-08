import React from "react";

const SummaryCard = ({ title, value, icon: Icon, tone = "slate" }) => {
  const toneStyles = {
    slate: "bg-slate-900 text-white",
    blue: "bg-gradient-to-r from-blue-600 to-indigo-600 text-white",
    green: "bg-gradient-to-r from-emerald-600 to-green-600 text-white",
    amber: "bg-gradient-to-r from-amber-500 to-orange-500 text-white",
    purple: "bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white",
  };

  return (
    <div
      className={`rounded-xl md:rounded-2xl p-4 md:p-5 shadow-sm hover:shadow-md transition-all border border-white/10 ${
        toneStyles[tone] || toneStyles.slate
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] md:text-sm/6 opacity-90">{title}</p>
          <p className="mt-1 text-xl md:text-2xl font-bold tracking-tight leading-tight">
            {value}
          </p>
        </div>
        {Icon ? (
          <div className="h-10 w-10 rounded-xl bg-white/15 flex items-center justify-center">
            <Icon size={18} />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default SummaryCard;

