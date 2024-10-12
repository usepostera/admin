import { useCallback, useMemo } from "react";
import { useAppSelector } from "../store/store";
import instance from "../lib/axiosInstance";
import { TMetric } from "../@types";

export const useDashboardService = () => {
  const token = useAppSelector((state) => state.auth.token);

  const axiosInstance = useMemo(() => {
    return instance(token ?? undefined);
  }, [token]);

  const getDashboardMetrics = useCallback(async (): Promise<TMetric[]> => {
    return (await axiosInstance.get("/dashboard/metrics")).data;
  }, [axiosInstance]);

  return { getDashboardMetrics };
};
