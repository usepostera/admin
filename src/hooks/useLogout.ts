import { useCallback } from "react";
import { useAppDispatch } from "../store/store";
import { logout } from "../store/authSlice";
import { useDisconnect } from "wagmi";

export const useLogout = () => {
  const dispatch = useAppDispatch();
  const { disconnect } = useDisconnect();

  const signout = useCallback(async () => {
    disconnect();
    dispatch(logout());
  }, [disconnect, dispatch]);

  return signout;
};
