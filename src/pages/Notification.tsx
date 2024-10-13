import React from "react";
import withAuthRedirect from "../hoc/withAuthRedirect";
import { NotificationList } from "../components/NotificationList";

export const Notification: React.FC = () => {
  return (
    <div className="p-4 md:!p-8">
      <div className="w-full max-w-[380px]">
        <NotificationList />
      </div>
    </div>
  );
};

const NotificationPage = withAuthRedirect(Notification);
export default NotificationPage;
