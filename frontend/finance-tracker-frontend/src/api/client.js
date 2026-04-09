import axios from "axios";
import { API_BASE_URL } from "../api/production";

/**
 * Shared API client for app.
 * Uses httpOnly cookies (withCredentials) and optionally a per-tab bearer token
 * stored in sessionStorage to prevent cross-tab identity mixing.
 */
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

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
