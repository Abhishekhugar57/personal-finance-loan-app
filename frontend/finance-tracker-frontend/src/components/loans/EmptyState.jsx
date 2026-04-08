import React from "react";
import { Landmark } from "lucide-react";

const EmptyState = ({
  title = "No loans yet",
  description = "Add your first loan to start tracking repayments.",
  action,
}) => {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-10 text-center">
      <div className="mx-auto h-12 w-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center shadow-sm">
        <Landmark size={22} />
      </div>
      <h3 className="mt-4 text-lg font-semibold text-gray-900">{title}</h3>
      <p className="mt-1 text-sm text-gray-500">{description}</p>
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
};

export default EmptyState;

