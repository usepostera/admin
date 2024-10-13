import { useCallback, useEffect, useState } from "react";
import { useRequestHandler } from "./useRequestHandler";
import { usePickupService } from "../services/pickup";
import { TPickupRequest } from "../@types";

export const usePickupRequets = (id: string | undefined) => {
  const [totalPages, setTotalPages] = useState(1);
  const [pickups, setPickups] = useState<TPickupRequest[]>([]);

  const { getPickups, getPickupById } = usePickupService();
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

  const [data, setData] = useState<TPickupRequest | null>(null);
  const { trigger: triggerPickupById, loading: loadingPickup } =
    useRequestHandler(getPickupById);

  const reloadPickup = useCallback((data: TPickupRequest) => {
    setData(data);
  }, []);

  const httpFetchPickup = useCallback(
    async (id: string) => {
      const result = await triggerPickupById(id);
      if (result) {
        setData(result);
      }
    },
    [triggerPickupById]
  );

  useEffect(() => {
    if (id) {
      httpFetchPickup(id);
    }

    return () => {
      setData(null);
    };
  }, [httpFetchPickup, id]);

  return {
    loading,
    pickups,
    loadPage,
    reloadPickup,
    totalPages,
    pickup: data,
    loadingPickup,
  };
};
