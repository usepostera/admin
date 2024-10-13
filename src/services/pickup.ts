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

  const getPickupById = useCallback(
    async (id: string) => {
      const res = await axiosInstance.get(`/pickup/${id}`);
      return res.data;
    },
    [axiosInstance]
  );

  const acceptPickup = useCallback(
    async (id: string, date: string) => {
      const res = await axiosInstance.post(`/pickup/${id}/accept`, { date });
      return res.data;
    },
    [axiosInstance]
  );

  const requestCompletePickup = useCallback(
    async (id: string, size: number) => {
      const res = await axiosInstance.post(`/pickup/${id}/complete-request`, {
        size,
      });
      return res.data;
    },
    [axiosInstance]
  );

  return { getPickups, getPickupById, acceptPickup, requestCompletePickup };
};
