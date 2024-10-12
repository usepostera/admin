import { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import { useRequestHandler } from "./useRequestHandler";
import { useAddressService } from "../services/address";
import { initializeUserAddresses } from "../store/addressSlice";

export const useUserAddress = () => {
  const dispatch = useAppDispatch();
  const initialized = useAppSelector((state) => state.address.isInitialzed);
  const adddresses = useAppSelector((state) => state.address.data);

  const { getUserAddresses } = useAddressService();
  const { trigger, loading } = useRequestHandler(getUserAddresses);

  const httpFetchAddresses = useCallback(async () => {
    const result = await trigger();

    if (result) {
      dispatch(initializeUserAddresses(result));
    }
  }, [dispatch, trigger]);

  const getAddressById = useCallback(
    (id: string) => adddresses.find((e) => e._id === id),
    [adddresses]
  );

  useEffect(() => {
    if (!initialized) {
      httpFetchAddresses();
    }
  }, [initialized, httpFetchAddresses]);

  return { loading, adddresses, getAddressById };
};
