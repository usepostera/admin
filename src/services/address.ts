import { useCallback, useMemo } from "react";
import { useAppSelector } from "../store/store";
import instance from "../lib/axiosInstance";
import { AddressInput, TUserAddress } from "../@types";

export const useAddressService = () => {
  const token = useAppSelector((state) => state.auth.token);

  const axiosInstance = useMemo(() => {
    return instance(token ?? undefined);
  }, [token]);

  const getUserAddresses = useCallback(async (): Promise<TUserAddress[]> => {
    return (await axiosInstance.get("/addresses")).data;
  }, [axiosInstance]);

  const saveNewAddress = useCallback(
    async (data: AddressInput): Promise<TUserAddress> => {
      return (await axiosInstance.post("/addresses", data)).data;
    },
    [axiosInstance]
  );

  return { getUserAddresses, saveNewAddress };
};
