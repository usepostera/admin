import { useCallback, useEffect, useState } from "react";
import { TVolunteerEvent } from "../@types";
import { useRequestHandler } from "./useRequestHandler";
import { useVolunteerService } from "../services/volunteer";

export const useVolunteerEvents = () => {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [events, setEvents] = useState<TVolunteerEvent[]>([]);

  const { getEvents } = useVolunteerService();
  const { trigger, loading } = useRequestHandler(getEvents);

  const httpFetchEvents = useCallback(
    async (page: number, reset = false) => {
      const result = await trigger(page);

      if (result) {
        if (reset) {
          setEvents(result.data);
        } else {
          setEvents((prev) => [...prev, ...result.data]);
        }
        setPage(+result.page);
        setTotalPages(+result.totalPages);
      }
    },
    [trigger]
  );

  const loadMore = useCallback(async () => {
    if (page < totalPages && !loading) {
      httpFetchEvents(page + 1);
    }
  }, [httpFetchEvents, loading, page, totalPages]);

  const update = useCallback((val: TVolunteerEvent) => {
    setEvents((prev) =>
      prev.map((item) => {
        if (item._id === val._id) {
          return { ...item, ...val };
        }
        return item;
      })
    );
  }, []);

  const reset = useCallback(() => {
    setTotalPages(0);
    setPage(1);
    setEvents([]);
  }, []);

  const reload = () => {
    if (page === 1) {
      httpFetchEvents(1, true);
    } else {
      reset();
    }
  };

  useEffect(() => {
    if (page === 1) {
      httpFetchEvents(page);
    }

    return reset;
  }, [httpFetchEvents, page, reset]);

  return {
    loading,
    events,
    loadMore,
    hasMore: page < totalPages,
    update,
    reload,
  };
};

export type TuseVolunteerEvents = ReturnType<typeof useVolunteerEvents>;
