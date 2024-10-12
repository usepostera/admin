/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useMemo, useRef, useState } from "react";
import { useLogout } from "./useLogout";
import { parseApiError } from "../lib/parseError";
import toast from "react-hot-toast";

export const useRequestHandler = <T extends (...args: any[]) => any>(
  fn: T,
  options?: { onError?: (msg: string) => void }
) => {
  const [loading, setLoading] = useState(false);
  const loadingRef = useRef(false);

  const { onError } = options ?? {};

  const logout = useLogout();

  const trigger = useCallback(
    async (...args: Parameters<T>): Promise<ReturnType<T> | void> => {
      if (loadingRef.current) {
        return;
      }

      try {
        loadingRef.current = true;
        setLoading(true);
        return await fn(...args);
      } catch (error: any) {
        if (error.name === "CanceledError") {
          return;
        }
        const message = parseApiError(error);
        if (error.response?.status === 401) {
          toast.error(message);
          logout();
        } else if (onError) {
          onError(message);
        } else {
          toast.error(message);
        }
        return;
      } finally {
        loadingRef.current = false;
        setLoading(false);
      }
    },
    [fn, onError, logout]
  );

  const data = useMemo(
    () => ({
      trigger,
      loading,
    }),
    [trigger, loading]
  );

  return data;
};
