import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

export const createAxiosInstance = ({ url, token }) => {
  // Create axios instance with validated configuration
  const instance = axios.create({
    baseURL: url,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    timeout: process.env.API_TIMEOUT
      ? parseInt(process.env.API_TIMEOUT)
      : 10000,
  });

  // Add request interceptor for logging (optional, can be removed in production)
  instance.interceptors.request.use(
    config => {
      if (process.env.NODE_ENV === "development") {
        console.log(
          `Making ${config.method?.toUpperCase()} request to: ${config.url}`
        );
      }
      return config;
    },
    error => {
      console.error("Request error:", error);
      return Promise.reject(error);
    }
  );

  // Add response interceptor for error handling
  instance.interceptors.response.use(
    response => {
      return response;
    },
    error => {
      if (error.response) {
        // Server responded with error status
        console.error(
          `API Error ${error.response.status}:`,
          error.response.data
        );
      } else if (error.request) {
        // Request was made but no response received
        console.error("Network Error: No response received from server");
      } else {
        // Something else happened
        console.error("Request Error:", error.message);
      }
      return Promise.reject(error);
    }
  );

  return instance;
};
