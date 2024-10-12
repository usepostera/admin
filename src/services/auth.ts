import { useCallback, useMemo } from "react";
import { useAppSelector } from "../store/store";
import instance from "../lib/axiosInstance";
import { LoginData, LoginResponse } from "../@types";

export const useAuthService = () => {
  const token = useAppSelector((state) => state.auth.token);

  const axiosInstance = useMemo(() => {
    return instance(token ?? undefined);
  }, [token]);

  const login = useCallback(
    async (data: LoginData): Promise<LoginResponse> => {
      return (await axiosInstance.post("/login/admin", data)).data;
    },
    [axiosInstance]
  );

  return { login };
};
