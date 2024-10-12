import { useCallback, useMemo } from "react";
import { useAppSelector } from "../store/store";
import instance from "../lib/axiosInstance";
import { PickupRequestInput, TPickupRequest } from "../@types";

export const usePickupService = () => {
  const token = useAppSelector((state) => state.auth.token);

  const axiosInstance = useMemo(() => {
    return instance(token ?? undefined);
  }, [token]);

  const requestNewPickup = useCallback(
    async (
      data: PickupRequestInput & { recyclable: string }
    ): Promise<TPickupRequest> => {
      return (await axiosInstance.post("/pickup", data)).data;
    },
    [axiosInstance]
  );

  return { requestNewPickup };
};
