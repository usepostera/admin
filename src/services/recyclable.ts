import { useCallback, useMemo } from "react";
import { useAppSelector } from "../store/store";
import instance from "../lib/axiosInstance";
import { TRecyclable } from "../@types";

export const useRecyclableService = () => {
  const token = useAppSelector((state) => state.auth.token);

  const axiosInstance = useMemo(() => {
    return instance(token ?? undefined);
  }, [token]);

  const getRecyclables = useCallback(async (): Promise<TRecyclable[]> => {
    return (await axiosInstance.get("/recyclables")).data;
  }, [axiosInstance]);

  return { getRecyclables };
};
