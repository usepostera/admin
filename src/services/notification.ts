import { useCallback, useMemo } from "react";
import { useAppSelector } from "../store/store";
import instance from "../lib/axiosInstance";
import { TNotification } from "../@types";

export const useNotificationService = () => {
  const token = useAppSelector((state) => state.auth.token);

  const axiosInstance = useMemo(() => {
    return instance(token ?? undefined);
  }, [token]);

  const getMyNotifications = useCallback(
    async (
      page = 1
    ): Promise<{
      data: TNotification[];
      total: number;
      page: number;
      totalPages: number;
    }> => {
      return (await axiosInstance.get(`/notifications?page=${page}&limit=20`))
        .data;
    },
    [axiosInstance]
  );

  return { getMyNotifications };
};
