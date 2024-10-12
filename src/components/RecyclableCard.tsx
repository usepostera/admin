import React from "react";
import { TRecyclable } from "../@types";
import { baseURL } from "../lib/axiosInstance";
import SimpleAnimatedComponent from "./SimpleAnimatedComponent";
import RippleEffect from "./Ripple";

type Props = {
  data: TRecyclable;
  onSelect?: (item: TRecyclable) => void;
  selected?: boolean;
};

export const RecyclableCard: React.FC<Props> = (props) => {
  const {
    data: { image, name },
    onSelect,
    selected,
  } = props;

  return (
    <SimpleAnimatedComponent className="delay-300">
      <RippleEffect
        className={`w-full md:w-auto rounded-[20px] p-2 ${
          selected ? "bg-[#228B2280]" : "bg-transparent"
        } transition-all duration-300`}
        onClick={onSelect ? () => onSelect(props.data) : undefined}
      >
        <div className="md:w-[184px] cursor-pointer">
          <img
            src={`${baseURL}/${image}`}
            alt={name}
            className="h-[152px] w-full object-cover rounded-[20px] bg-[#32CD32] mb-2"
          />

          <p className="font-montserrat text-[20px] leading-[24.38px]">
            {name}
          </p>
        </div>
      </RippleEffect>
    </SimpleAnimatedComponent>
  );
};
