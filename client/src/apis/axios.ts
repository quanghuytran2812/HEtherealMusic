/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMeStore } from "@/stores/useMeStore";
import axios from "axios";
import { toast } from "sonner";
import { apiRefreshToken } from "./auth";

const authorizedAxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  timeout: 10000 * 60 * 10,
  withCredentials: true,
});

// Add a request interceptor
authorizedAxiosInstance.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Initialize a promise for the refresh token API call
let refreshTokenPromise: Promise<any> | null;

// Add a response interceptor
authorizedAxiosInstance.interceptors.response.use(
  (response) => {
    // Any status code that lies within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  (error) => {
    // Any status codes that fall outside the range of 2xx cause this function to trigger
    // Do something with response error

    /** Important: Automatically handle token refresh */
    // Case 1: If a 401 status code is received, log out
    if (error.response?.status === 401) {
      useMeStore.getState().logout();
      location.href = "/login";
    }

    // Case 2: If a 410 status code is received, refresh the token
    const originalRequest = error.config;
    if (error.response?.status === 410 && originalRequest) {
      // Check if refreshTokenPromise is null, then initiate the refresh token API call
      if (!refreshTokenPromise) {
        refreshTokenPromise = apiRefreshToken()
          .then(() => {
            // accessToken cũng đã được update lại ở Cookie rồi
          })
          .catch(() => {
            // Log out on any error from the refresh token API
            useMeStore.getState().logout();
            location.href = "/login";
          })
          .finally(() => {
            refreshTokenPromise = null;
          });
      }

      return refreshTokenPromise.then(() => {
        /**
         * Return the axios instance with the original request to retry
         */
        return authorizedAxiosInstance(originalRequest);
      });
    }

    // Handle error messages from all APIs here
    if (error.response?.status !== 410) {
      toast.error(error.response?.data?.message || error?.message);
    }

    return Promise.reject(error);
  }
);

export default authorizedAxiosInstance;

export const endpoints = {
  auth: {
    getCredentialFromCode: "/auth/get-credential-from-code",
    checkNewUser: "/auth/check-user-from-email/",
    loginWithGmail: "/auth/login-with-gmail",
    logout: "/auth/logout",
    refreshToken: "/auth/refresh-token",
    verifyAccount: "/auth/verify-account",
  },
  user: {
    signUpWithGmail: "/users/sign-up-with-gmail",
    getMe: "/users/me",
  },
};