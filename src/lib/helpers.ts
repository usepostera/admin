/* eslint-disable @typescript-eslint/no-explicit-any */
import { InternalAxiosRequestConfig } from "axios";

export const requestInterceptor =
  (token?: string | null) =>
  async (config: InternalAxiosRequestConfig<any>) => {
    console.log(token ? "Token exists" : "Token does not exist");
    console.log(token);
    console.log(config.url);
    console.log(config.method);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  };

export const capitalize = (val: string) => {
  if (val.length < 2) {
    return val.toUpperCase();
  }

  return `${val[0].toUpperCase()}${val.substring(1).toLowerCase()}`;
};

export const formatMMDDYYYY = (date: Date | null) => {
  if (!date) {
    return "";
  }
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${month}-${day}-${year}`;
};

export const formatYYYYMMDD = (date: Date | null) => {
  if (!date) {
    return "";
  }
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${year}-${month}-${day}`;
};
