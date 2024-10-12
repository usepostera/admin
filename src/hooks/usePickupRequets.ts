import { useCallback, useEffect, useState } from "react";
import { useRequestHandler } from "./useRequestHandler";
import { usePickupService } from "../services/pickup";
import { TPickupRequest } from "../@types";

export const usePickupRequets = () => {
  const [totalPages, setTotalPages] = useState(1);
  const [pickups, setPickups] = useState<TPickupRequest[]>([]);

  const { getPickups } = usePickupService();
  const { trigger, loading } = useRequestHandler(getPickups);

  const httpFetchPickups = useCallback(
    async (page: number) => {
      const result = await trigger(page);

      if (result) {
        setPickups((prev) => [...prev, ...result.data]);
        setTotalPages(+result.totalPages);
      }
    },
    [trigger]
  );

  const loadPage = useCallback(
    async (page: number) => {
      page += 1;

      if (page <= totalPages && !loading) {
        httpFetchPickups(page);
      }
    },
    [httpFetchPickups, loading, totalPages]
  );

  const reset = () => {
    setTotalPages(1);
    setPickups([]);
  };

  useEffect(() => {
    return reset;
  }, []);

  return {
    loading,
    pickups,
    loadPage,
    totalPages,
  };
};
