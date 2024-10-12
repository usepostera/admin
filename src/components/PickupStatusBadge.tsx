import React from "react";
import { PickupRequestStatus } from "../@types";
import { pickupStatusColors } from "../lib/constants";
import { capitalize } from "../lib/helpers";

type Props = {
  status: PickupRequestStatus;
};

export const PickupStatusBadge: React.FC<Props> = (props) => {
  const { status } = props;

  return (
    <div
      className="px-[14px] py-[3px] text-[10px] leading-[12.19px] font-montserrat flex items-center justify-center rounded-[40px]"
      style={{
        backgroundColor: pickupStatusColors[status].background,
        color: pickupStatusColors[status].foreground,
      }}
    >
      <div>{capitalize(status)}</div>
    </div>
  );
};
