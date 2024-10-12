import React, { ReactNode } from "react";
import { TMetric } from "../@types";
import SimpleAnimatedComponent from "./SimpleAnimatedComponent";

type Props = {
  data: TMetric;
  color: string;
  Icon: ReactNode;
};

export const MetricTile: React.FC<Props> = (props) => {
  const { color, Icon, data } = props;

  return (
    <SimpleAnimatedComponent>
      <div
        className="rounded-[12px] py-[14px] px-[20px] text-white w-[210px] space-y-2 h-full"
        style={{ backgroundColor: color }}
      >
        <div className="bg-white p-2 rounded-full w-fit">{Icon}</div>

        <p className="text-[18px] leading-[24px] font-light">{data.title}</p>

        <p className="font-medium text-[24px] leading-[29.26px]">
          {data.value}
        </p>
      </div>
    </SimpleAnimatedComponent>
  );
};
