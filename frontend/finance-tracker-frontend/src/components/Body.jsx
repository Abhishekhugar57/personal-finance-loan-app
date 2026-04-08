import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import React, { useMemo, useState } from "react";
import { Menu } from "lucide-react";
import { useLocation } from "react-router-dom";

const Body = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const title = useMemo(() => {
    const p = (location.pathname || "").toLowerCase();
    if (p.includes("/dashboard")) return "Dashboard";
    if (p.includes("/transactions")) return "Transactions";
    if (p.includes("/accounts")) return "Accounts";
    if (p.includes("/loans")) return "Loans";
    if (p.includes("/profile")) return "Profile";
    return "My Wallet";
  }, [location.pathname]);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100 overflow-x-hidden">
      {/* Sidebar */}
      <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />

      {/* Mobile header (prevents overlap) */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-30 flex items-center justify-between bg-white/95 backdrop-blur border-b border-gray-200 px-4 py-3">
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="inline-flex items-center justify-center rounded-lg p-2 text-slate-900 hover:bg-gray-50 transition"
          aria-label="Open navigation"
        >
          <Menu size={20} />
        </button>
        <h1 className="text-lg font-semibold text-gray-900 leading-tight">
          {title}
        </h1>
        <div className="w-10" aria-hidden="true" />
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto px-3 py-3 pt-14 md:pt-3 md:px-6 md:py-6 pb-24 md:ml-64 min-w-0">
        <Outlet />
      </div>
    </div>
  );
};

export default Body;
