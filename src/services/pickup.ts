import { useCallback, useMemo } from "react";
import { useAppSelector } from "../store/store";
import instance from "../lib/axiosInstance";
import { TPickupRequest } from "../@types";

export const usePickupService = () => {
  const token = useAppSelector((state) => state.auth.token);

  const axiosInstance = useMemo(() => {
    return instance(token ?? undefined);
  }, [token]);

  const getPickups = useCallback(
    async (
      page = 1
    ): Promise<{
      data: TPickupRequest[];
      total: number;
      page: number;
      totalPages: number;
    }> => {
      return (await axiosInstance.get(`/pickup?page=${page}&limit=20`)).data;
    },
    [axiosInstance]
  );

  return { getPickups };
};
