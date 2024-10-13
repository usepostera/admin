import { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import { useRequestHandler } from "./useRequestHandler";
import { useDashboardService } from "../services/dashboard";
import { initializeDashboardMetrics } from "../store/dashboardSlice";

export const useDashboard = () => {
  const dispatch = useAppDispatch();
  const metrics = useAppSelector((state) => state.dashboard.data);

  const { getDashboardMetrics } = useDashboardService();
  const { trigger, loading } = useRequestHandler(getDashboardMetrics);

  const httpFetchMetrics = useCallback(async () => {
    const result = await trigger();

    if (result) {
      dispatch(initializeDashboardMetrics(result));
    }
  }, [dispatch, trigger]);

  useEffect(() => {
    httpFetchMetrics();
  }, [httpFetchMetrics]);

  return { loading, metrics };
};
