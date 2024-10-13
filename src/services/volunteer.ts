import { useCallback, useMemo } from "react";
import { useAppSelector } from "../store/store";
import instance from "../lib/axiosInstance";
import { TVolunteerEvent, VolunteerInput } from "../@types";

export const useVolunteerService = () => {
  const token = useAppSelector((state) => state.auth.token);

  const axiosInstance = useMemo(() => {
    return instance(token ?? undefined);
  }, [token]);

  const createEvent = useCallback(
    async (data: VolunteerInput): Promise<TVolunteerEvent> => {
      const payload = new FormData();

      // eslint-disable-next-line prefer-const
      for (let [key, value] of Object.entries(data)) {
        if (value === null || typeof value === "undefined") {
          continue;
        }

        if (typeof value === "number") {
          value = value.toString();
        }

        payload.append(key, value);
      }

      return (
        await axiosInstance.post("/volunteer", payload, {
          headers: { "Content-Type": "multipart/form-data" },
        })
      ).data;
    },
    [axiosInstance]
  );

  const getEvents = useCallback(
    async (
      page = 1
    ): Promise<{
      data: TVolunteerEvent[];
      total: number;
      page: number;
      totalPages: number;
    }> => {
      return (await axiosInstance.get(`/volunteer?page=${page}&limit=20`)).data;
    },
    [axiosInstance]
  );

  return { createEvent, getEvents };
};
