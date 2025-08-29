// lib/useAxios.ts
import axios, { AxiosInstance } from "axios";

let axiosInstance: AxiosInstance | null = null;

export default function useApi(): AxiosInstance {
  if (!axiosInstance) {
    axiosInstance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000",
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    // REQUEST INTERCEPTOR
    axiosInstance.interceptors.request.use(
      (config) => {
        if (typeof window !== "undefined") {
          const token = localStorage.getItem("token");
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // RESPONSE INTERCEPTOR
    axiosInstance.interceptors.response.use(
      (response) => response.data,
      (error) => {
        if (typeof window !== "undefined" && error.response?.status === 401) {
          localStorage.removeItem("token");
          window.location.href = "/login";
        }
        return Promise.reject(error);
      }
    );
  }

  return axiosInstance;
}
