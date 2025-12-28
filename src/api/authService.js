import api from "./axios";

export const login = (data) => api.post("/auth/login", data);

export const register = (data) => api.post("/auth/register", data);

export const logout = () => {
  // Remove JWT
  sessionStorage.removeItem("token");

  // Clear all session data
  sessionStorage.clear();

  // Force reload & clear history stack
  window.location.replace("/");
};
