import React from "react";
import { IoIosArrowDown } from "react-icons/io";
import { capitalize } from "../../lib/helpers";

type Props = {
  label: string;
  options: string[];
} & React.SelectHTMLAttributes<HTMLSelectElement>;

export const SelectInput: React.FC<Props> = (props) => {
  const { label, options, ...selectProps } = props;

  return (
    <div>
      {label && (
        <label
          className="text-[14px] leading-[17.5px] font-normal block mb-2"
          htmlFor={selectProps.id}
        >
          {label}
        </label>
      )}

      <div className="w-full relative">
        <select
          className="w-full bg-[#EFEFEF80] rounded-[6px] block appearance-none px-4 py-2 outline-none border-none"
          {...selectProps}
        >
          <option value="" selected disabled>
            Select
          </option>

          {options.map((option, id) => (
            <option key={id + "_option"}>{capitalize(option)}</option>
          ))}
        </select>

        <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center px-2 text-gray-700">
          <IoIosArrowDown size={20} />
        </div>
      </div>
    </div>
  );
};
