/*
import React, { useState } from "react";
import {
  LayoutDashboard,
  ArrowLeftRight,
  Wallet,
  Landmark,
  User,
} from "lucide-react";
import { useSelector } from "react-redux";

const DashboardLayout = () => {
  const [active, setActive] = useState("Dashboard");
  const user = useSelector((state) => state.user);

  const initials = user?.userName
    ? user.userName.slice(0, 2).toUpperCase()
    : "US";

  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Transactions", path: "/transactions", icon: ArrowLeftRight },
    { name: "Account", path: "/accounts", icon: Wallet },
    { name: "Loans", path: "/loans", icon: Landmark },
    { name: "Profile", path: "/profile", icon: User },
  ];

  return (
    <div className="min-h-screen flex">
  
      <nav className="shadow-md h-screen p-3 flex flex-col bg-blue-600 text-white w-60 duration-500">
        
        <div className="px-3 py-4 h-20 flex items-center border-b border-blue-500">
          <h2 className="text-xl font-semibold tracking-wide">My Wallet</h2>
        </div>

       
        <ul className="flex-1 mt-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = active === item.name;

            return (
              <li
                key={item.name}
                onClick={() => setActive(item.name)}
                className={`px-3 py-3 my-2 rounded-md cursor-pointer flex gap-3 items-center transition-all duration-300
                ${isActive ? "bg-blue-800" : "hover:bg-blue-700"}`}
              >
                <Icon size={22} />
                <span className="font-medium">{item.name}</span>
              </li>
            );
          })}
        </ul>

       
        <div className="flex items-center gap-3 px-3 py-4 border-t border-blue-500">
          <div className="w-10 h-10 rounded-full bg-white text-blue-600 flex items-center justify-center font-semibold">
            {initials}
          </div>
          <div className="leading-4">
            <p className="text-sm font-medium">{user?.userName}</p>
            <span className="text-xs text-blue-200">{user?.email}</span>
          </div>
        </div>
      </nav>

      <div className="flex-1 bg-slate-50 p-8">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">{active}</h1>

        
        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <p className="text-gray-500">
            Select a section from the sidebar to view details.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
import React, { useState } from "react";
import {
  LayoutDashboard,
  ArrowLeftRight,
  Wallet,
  Landmark,
  User,
} from "lucide-react";
import { useSelector } from "react-redux";

const DashboardLayout = () => {
  const [active, setActive] = useState("Dashboard");
  const user = useSelector((state) => state.user);

  const initials = user?.userName
    ? user.userName.slice(0, 2).toUpperCase()
    : "US";

  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Transactions", path: "/transactions", icon: ArrowLeftRight },
    { name: "Account", path: "/accounts", icon: Wallet },
    { name: "Loans", path: "/loans", icon: Landmark },
    { name: "Profile", path: "/profile", icon: User },
  ];

  return (
    <div className="min-h-screen flex">
   
      <nav className="h-screen w-60 bg-slate-900 text-white flex flex-col shadow-2xl">
  
        <div className="px-6 py-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <Wallet size={22} className="text-blue-500" />
            <h2 className="text-xl font-semibold tracking-tight">My Wallet</h2>
          </div>
        </div>

    
        <ul className="flex-1 mt-6 px-3">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = active === item.name;

            return (
              <li
                key={item.name}
                onClick={() => setActive(item.name)}
                className={`flex items-center gap-3 px-4 py-3 my-1 rounded-lg cursor-pointer transition-all duration-200 border-l-4
                ${
                  isActive
                    ? "bg-slate-800 border-blue-500 text-white font-semibold shadow-sm"
                    : "border-transparent text-gray-400 hover:bg-slate-800 hover:text-white hover:translate-x-1"
                }`}
              >
                <Icon size={20} />
                <span className="text-sm">{item.name}</span>
              </li>
            );
          })}
        </ul>

        <div className="px-4 py-5 border-t border-white/10">
          <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-800 transition-all duration-200 cursor-pointer">
          

            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center font-semibold shadow-md">
              {initials}
            </div>


            <div className="leading-tight">
              <p className="text-sm font-medium text-white">
                {user?.userName || "User"}
              </p>
              <span className="text-xs text-gray-400">
                {user?.email || "user@email.com"}
              </span>
            </div>
          </div>
        </div>
      </nav>

  
      <div className="flex-1 bg-gradient-to-br from-slate-50 to-slate-100 p-10">
        <h1 className="text-2xl font-semibold text-gray-800 mb-8">{active}</h1>

        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <p className="text-gray-500">
            Select a section from the sidebar to view details.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
*/
import React, { useEffect } from "react";
import {
  LayoutDashboard,
  ArrowLeftRight,
  Wallet,
  Landmark,
  User,
  X,
} from "lucide-react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const Sidebar = ({ mobileOpen = false, onClose }) => {
  const user = useSelector((state) => state.user);

  const initials = user?.userName
    ? user.userName.slice(0, 2).toUpperCase()
    : "US";

  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Transactions", path: "/transactions", icon: ArrowLeftRight },
    { name: "Accounts", path: "/accounts", icon: Wallet },
    { name: "Loans", path: "/loans", icon: Landmark },
    { name: "Profile", path: "/profile", icon: User },
  ];

  useEffect(() => {
    // Prevent background scroll when mobile drawer is open
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen ? (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      ) : null}

      <nav
        className={[
          "fixed top-0 bottom-0 left-0 z-50 w-64 bg-slate-900 text-white flex flex-col shadow-xl",
          "transform transition-transform duration-300 ease-out",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
          "md:translate-x-0",
          "md:shadow-none",
        ].join(" ")}
        aria-label="Main navigation"
      >
        {/* Branding */}
        <div className="px-4 py-5 flex items-center border-b border-white/10">
          <div className="flex items-center gap-2 min-w-0">
            <Wallet size={20} className="text-blue-400" />
            <h2 className="text-lg font-bold tracking-wide uppercase truncate">
              My Wallet
            </h2>
          </div>

          {/* Close button for mobile */}
          <button
            type="button"
            onClick={onClose}
            className="md:hidden ml-auto rounded-xl hover:bg-slate-800 p-2 transition"
            aria-label="Close navigation"
          >
            <X size={18} />
          </button>
        </div>

        {/* Menu */}
        <ul className="flex-1 mt-4 px-2 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-3 my-2 rounded-md transition-all duration-300 border-l-4 ${
                    isActive
                      ? "bg-slate-800 border-blue-500 font-semibold"
                      : "border-transparent hover:bg-slate-800"
                  }`
                }
              >
                <Icon size={20} />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </ul>

        {/* User Section */}
        <div className="px-3 py-4 border-t border-white/10">
          <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-800 transition-all duration-300">
            {/* Avatar */}
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 text-white flex items-center justify-center font-semibold shadow-md">
              {initials}
            </div>

            {/* User Info */}
            <div className="leading-tight min-w-0">
              <p className="text-sm font-medium truncate">
                {user?.userName || "User"}
              </p>
              <span className="text-xs text-gray-400 truncate block">
                {user?.email || "user@email.com"}
              </span>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Sidebar;
