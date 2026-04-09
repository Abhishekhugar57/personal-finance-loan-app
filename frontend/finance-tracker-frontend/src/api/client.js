import axios from "axios";

/**
 * Shared API client for app.
 * Uses httpOnly cookies (withCredentials) and optionally a per-tab bearer token
 * stored in sessionStorage to prevent cross-tab identity mixing.
 */
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

// Export base URL for manual API calls if needed
export { API_BASE_URL };

const TOKEN_KEY = "financeToken";

api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem(TOKEN_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export function setSessionToken(token) {
  if (token) sessionStorage.setItem(TOKEN_KEY, token);
  else sessionStorage.removeItem(TOKEN_KEY);
}

export function clearSessionToken() {
  sessionStorage.removeItem(TOKEN_KEY);
}

/**
 * Notifies other tabs to re-sync auth state (if they use ProtectedRoute sync).
 */
export function broadcastAuthChanged() {
  try {
    localStorage.setItem("finance-auth-sync", String(Date.now()));
  } catch {
    // ignore
  }
}

export default api;
