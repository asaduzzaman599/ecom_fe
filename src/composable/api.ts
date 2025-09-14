// lib/useAxios.ts
import { Local_STORAGE_TOKEN_KEY } from "@/utils/constant";
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

let axiosInstance: AxiosInstance | null = null;

export default function useApi() {
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
          const token = localStorage.getItem(Local_STORAGE_TOKEN_KEY);
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        }
        return config;
      },
      (error) =>
      {
        console.log(error)
      }
    );

    // RESPONSE INTERCEPTOR
    axiosInstance.interceptors.response.use(
      (response) => response.data,
      (error) => {
        if (typeof window !== "undefined" && error.response?.status === 401) {
          localStorage.removeItem(Local_STORAGE_TOKEN_KEY);
          // window.location.href = "/login";
        }
        return Promise.reject(error);
      }
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const execute = async <T>(uri: string, method: 'POST' | 'GET' | 'PATCH', options?: {data?: any, config?: AxiosRequestConfig<unknown>}): Promise<T> =>{
    
    if(method === 'POST'){
      return axiosInstance?.post(uri, options?.data, options?.config ) as unknown as Promise<T>
    }
    if(method === 'PATCH'){
      return axiosInstance?.patch(uri, options?.data, options?.config ) as unknown as Promise<T>
    }
    else {
      return axiosInstance?.get(uri, options?.config)  as unknown as Promise<T>
    }

  }

  return execute;
}
