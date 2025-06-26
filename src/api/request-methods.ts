import { AxiosRequestConfig } from "axios";
import axiosInstance from "@/api/request";

export const get = <T = unknown>(
  url: string,
  params?: Record<string, unknown>,
  config?: AxiosRequestConfig
) => {
  return axiosInstance.get<T>(url, {
    params,
    ...config,
  });
};
