import React, { useCallback } from "react";
import { useNotifications } from "../hooks/useNotifications";
import { InfiniteScroll } from "./InfiniteScroll";
import { NotificationAction, TNotification } from "../@types";

export const NotificationList: React.FC = () => {
  const { notifications, loadMore, hasMore, loading, update } =
    useNotifications();

  return (
    <InfiniteScroll
      items={notifications}
      hasMore={hasMore}
      isFetching={loading}
      loadMore={loadMore}
      renderItem={(item) => (
        <NotificationTile key={item._id} data={item} update={update} />
      )}
    />
  );
};

type NotificationTileProps = {
  data: TNotification;
  update?: (val: TNotification) => void;
};
const NotificationTile: React.FC<NotificationTileProps> = (props) => {
  const { data } = props;

  const renderAction = useCallback(() => {
    if (
      typeof data.action === "undefined" ||
      data.action === null ||
      data.action_complete
    )
      return null;

    switch (data.action) {
      case NotificationAction.acceptMeasuredUnit:
        return null;
    }
  }, [data.action, data.action_complete]);

  return (
    <div className="w-full p-4 border-b-[1px] border-[#0000004D] space-y-2">
      <p className="text-[16px] leading-[22px]">{data.message}</p>

      <p className="text-[12px] leading-[24px]">
        {new Date(data.createdAt).toDateString()}
      </p>

      <div className="w-fit">{renderAction()}</div>
    </div>
  );
};
