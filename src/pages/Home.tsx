/* eslint-disable react-refresh/only-export-components */
import React from "react";
import withAuthRedirect from "../hoc/withAuthRedirect";
import { useDashboard } from "../hooks/useDashboard";
import Loader from "../components/Loader";
import { MetricTile } from "../components/MetricTile";

import UserTickIcon from "../assets/svgs/user-tick.svg";
import MoneysIcon from "../assets/svgs/moneys.svg";
import RepeatCircleIcon from "../assets/svgs/repeat-circle.svg";
import TruckIcon from "../assets/svgs/truck2.svg";
import Button from "../components/Button";

const DashboardPage: React.FC = () => {
  const {
    loading,
    refresh,
    metrics: [user, payout, collectedRecyclables, pickups],
  } = useDashboard();

  return (
    <div className="w-full space-y-8 font-montserrat p-4 md:p-8">
      <div>
        <div className="w-fit mb-2">
          <Button.Text
            label="Refresh"
            type="button"
            onClick={refresh}
            disabled={loading}
          />
        </div>

        {loading ? (
          <Loader />
        ) : (
          <div className="flex flex-row gap-6 flex-wrap">
            {user && (
              <MetricTile
                data={user}
                color="#228B22"
                Icon={<UserTickIcon height={20} width={20} />}
              />
            )}

            {payout && (
              <MetricTile
                data={payout}
                color="#32CD32"
                Icon={<MoneysIcon height={20} width={20} />}
              />
            )}

            {collectedRecyclables && (
              <MetricTile
                data={collectedRecyclables}
                color="#008080"
                Icon={<RepeatCircleIcon height={20} width={20} />}
              />
            )}

            {pickups && (
              <MetricTile
                data={pickups}
                color="#4EA7CB"
                Icon={<TruckIcon height={20} width={20} />}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default withAuthRedirect(DashboardPage);
