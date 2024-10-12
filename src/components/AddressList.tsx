import React from "react";
import SimpleAnimatedComponent from "./SimpleAnimatedComponent";
import { TUserAddress } from "../@types";
import Checkbox from "./Checkbox";
import RippleEffect from "./Ripple";

type Props = {
  selected?: string;
  onSelect?: (addressId: string) => void;
};

const AddressList: React.FC<Props> = (props) => {
  const { onSelect, selected } = props;
  const adddresses: TUserAddress[] = [];
  const loading = false;

  return (
    <SimpleAnimatedComponent className="w-full">
      <div className="w-full flex flex-col items-start">
        {!loading && adddresses.length === 0 && (
          <p className="font-montserrat fomt-medium text-xl">
            No address found.
          </p>
        )}

        {!loading &&
          adddresses.length > 0 &&
          adddresses.map((address) => (
            <AddressTile
              data={address}
              key={address._id}
              onSelect={onSelect ? () => onSelect(address._id) : undefined}
              isSelected={selected === address._id}
            />
          ))}
      </div>
    </SimpleAnimatedComponent>
  );
};

export default AddressList;

type AddressTileProps = {
  data: TUserAddress;
  isSelected?: boolean;
  onSelect?: VoidFunction;
};

const AddressTile: React.FC<AddressTileProps> = (props) => {
  const { data, isSelected = false, onSelect } = props;
  return (
    <SimpleAnimatedComponent className="w-full delay-300">
      <RippleEffect
        className={`w-full font-montserrat py-2 px-4 rounded-[12px] border-[1px] flex flex-row gap-4 items-center ${
          isSelected ? "border-[#228B22]" : "border-[#0000004D]"
        }`}
        onClick={onSelect}
      >
        <div className="flex-1">
          <span className="text-[12px] leading-[22px] font-light mb-2">
            {data.addressType}
          </span>

          <p className="text-[16px] leading-[22px]">{data.address}</p>
        </div>

        <Checkbox isSelected={isSelected} />
      </RippleEffect>
    </SimpleAnimatedComponent>
  );
};
