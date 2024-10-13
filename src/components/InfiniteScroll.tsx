import React, { useRef, useCallback } from "react";
import Loader from "./Loader";

interface InfiniteScrollProps<T> {
  items: T[];
  hasMore: boolean;
  isFetching: boolean;
  loadMore: () => void;
  renderItem: (item: T, index: number) => React.ReactNode;
}

export const InfiniteScroll = <T,>({
  items,
  hasMore,
  loadMore,
  renderItem,
  isFetching,
}: InfiniteScrollProps<T>) => {
  const observer = useRef<IntersectionObserver | null>(null);

  const lastItemRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isFetching) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMore();
        }
      });

      if (node) observer.current.observe(node);
    },
    [isFetching, hasMore, loadMore]
  );

  return (
    <div className="overflow-auto w-full">
      <div className="space-y-4">
        {items.map((item, index) => {
          if (index === items.length - 1) {
            return (
              <div key={index} ref={lastItemRef} className="last-item">
                {renderItem(item, index)}
              </div>
            );
          }
          return (
            <div key={index} className="item">
              {renderItem(item, index)}
            </div>
          );
        })}
      </div>

      {isFetching && (
        <div className="w-fit mx-auto my-2">
          <Loader size={20} />
        </div>
      )}
    </div>
  );
};
