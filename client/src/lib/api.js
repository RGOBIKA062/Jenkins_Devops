/**
 * API Service Utility for Frontend
 * Handles all HTTP requests to backend with authentication
 */

const API_BASE_URL = "http://localhost:5000/api";

/**
 * Get auth token from localStorage
 */
const getAuthToken = () => {
  return localStorage.getItem("authToken");
};

/**
 * Generic fetch wrapper with auth header
 */
const apiCall = async (endpoint, options = {}) => {
  const token = getAuthToken();
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Request failed");
    }

    return data;
  } catch (error) {
    throw error;
  }
};

/**
 * Authentication API Calls
 */

export const authAPI = {
  /**
   * Sign up new user
   */
  signup: (fullName, email, password, confirmPassword, userType = "student") =>
    apiCall("/auth/signup", {
      method: "POST",
      body: JSON.stringify({
        fullName,
        email,
        password,
        confirmPassword,
        userType,
      }),
    }),

  /**
   * Login user
   */
  login: (email, password) =>
    apiCall("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),

  /**
   * Get current user
   */
  getMe: () => apiCall("/auth/me", { method: "GET" }),

  /**
   * Logout user
   */
  logout: () => apiCall("/auth/logout", { method: "POST" }),

  /**
   * Update profile
   */
  updateProfile: (profileData) =>
    apiCall("/auth/profile", {
      method: "PUT",
      body: JSON.stringify(profileData),
    }),

  /**
   * Change password
   */
  changePassword: (oldPassword, newPassword, confirmPassword) =>
    apiCall("/auth/change-password", {
      method: "PUT",
      body: JSON.stringify({
        oldPassword,
        newPassword,
        confirmPassword,
      }),
    }),
};

export default apiCall;
