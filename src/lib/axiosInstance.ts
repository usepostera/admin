import axios from "axios";
import { requestInterceptor } from "./helpers";

const headers = {
  "content-type": "application/json",
};

export const baseURL = import.meta.env.VITE_API_ROUTE;

const instance = (token?: string) => {
  const axiosInstance = axios.create({
    baseURL: `${baseURL}/api/v1`,
    headers,
  });

  axiosInstance.interceptors.request.use(requestInterceptor(token));

  return axiosInstance;
};

export default instance;
