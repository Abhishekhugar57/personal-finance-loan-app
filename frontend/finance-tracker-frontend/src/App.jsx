/*import "./App.css";
import React from "react";

function App() {
  return (
    <>
      <h1 class="text-3xl font-bold text-blue-600">Tailwind is working 🚀</h1>
      If text is blue
    </>
  );
}

export default App;
import { Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import React from "react";
import Dashboard from "./components/Dashboard";
import Body from "./components/Body";
import Loans from "./components/Loans";
import Login from "./components/Login";
import Profile from "./components/profile";
import Sidebar from "./components/Sidebar";
import Transactions from "./components/Transactions";
import Accounts from "./components/Accounts";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          element={
            <ProtectedRoute>
              <Body />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/loans" element={<Loans />} />
          <Route path="/accounts" element={<Accounts />} />
        </Route>
      </Routes>
    </Provider>
  );
}

export default App;
*/
import { Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import React from "react";
import { Toaster } from "react-hot-toast";
import AddAccount from "./components/AddAccount";

import Dashboard from "./components/Dashboard";
import Body from "./components/Body";
import Loans from "./components/Loans";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Transactions from "./components/Transactions";
import Accounts from "./components/Accounts";
import AddTransaction from "./components/AddTransaction"; // ✅ ADD THIS
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Provider store={store}>
      <Toaster position="top-right" toastOptions={{ duration: 2500 }} />
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Body />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="dashboard" />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="transactions/new" element={<AddTransaction />} />{" "}
          {/* ✅ ADD THIS */}
          <Route path="accounts" element={<Accounts />} />
          <Route path="accounts/new" element={<AddAccount />} />
          <Route path="loans" element={<Loans />} />
          <Route path="accounts" element={<Accounts />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </Provider>
  );
}

export default App;
