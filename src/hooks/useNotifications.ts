import { useCallback, useEffect, useState } from "react";
import { TNotification } from "../@types";
import { useNotificationService } from "../services/notification";
import { useRequestHandler } from "./useRequestHandler";

export const useNotifications = () => {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [notifications, setNotifications] = useState<TNotification[]>([]);

  const { getMyNotifications } = useNotificationService();
  const { trigger, loading } = useRequestHandler(getMyNotifications);

  const httpFetchNotifications = useCallback(
    async (page: number) => {
      const result = await trigger(page);

      if (result) {
        setNotifications((prev) => [
          ...prev,
          ...result.data.map((e) => ({ ...e, action: Number(e.action) })),
        ]);
        setPage(+result.page);
        setTotalPages(+result.totalPages);
      }
    },
    [trigger]
  );

  const loadMore = useCallback(async () => {
    if (page < totalPages && !loading) {
      httpFetchNotifications(page + 1);
    }
  }, [httpFetchNotifications, loading, page, totalPages]);

  const update = useCallback((val: TNotification) => {
    setNotifications((prev) =>
      prev.map((not) => {
        if (not._id === val._id) {
          return { ...not, ...val };
        }
        return not;
      })
    );
  }, []);

  useEffect(() => {
    httpFetchNotifications(page);
  }, [httpFetchNotifications, page]);

  return {
    loading,
    notifications,
    loadMore,
    hasMore: page < totalPages,
    update,
  };
};
