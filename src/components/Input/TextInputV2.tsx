import React, { InputHTMLAttributes, ReactNode } from "react";
import { TValidatorError } from "../../@types";

type Props = {
  label?: string;
  error?: TValidatorError | null;
  isViewOnly?: boolean;
  suffixIcon?: ReactNode;
  prefixIcon?: ReactNode;
} & InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>;

export const TextInputV2: React.FC<Props> = ({
  label,
  multiple,
  error = null,
  isViewOnly = false,
  suffixIcon,
  prefixIcon,
  className,
  ...textInputProps
}) => {
  return (
    <div>
      {label && (
        <label
          className="text-[14px] leading-[17.5px] font-normal block mb-2"
          htmlFor={textInputProps.id}
        >
          {label}
        </label>
      )}
      {multiple && !isViewOnly && (
        <textarea
          className="w-full py-[10px] px-[16px] bg-[#EFEFEF80] rounded-[6px] text-[14px] leading-[17.01px] text-[#000000] outline-none"
          {...textInputProps}
          rows={5}
        />
      )}
      {!multiple && !isViewOnly && (
        <div
          className={`bg-[#EFEFEF80] flex flex-row items-center rounded-[6px] pr-[12px] ${className}`}
        >
          {prefixIcon && prefixIcon}

          <input
            className="flex-1 py-[8px] px-[12px] bg-transparent text-[14px] leading-[17.01px] text-[#000000] outline-none"
            {...textInputProps}
            autoComplete="off"
          />

          {suffixIcon && suffixIcon}
        </div>
      )}
      {isViewOnly && (
        <p className="text-[#334155] text-[16px] leading-[20px]">
          {textInputProps.value ?? "-"}
        </p>
      )}
      {error && (
        <p className="text-danger text-[12px] font-semibold leading-[15px] my-2">
          {typeof error === "string" && error}
        </p>
      )}
    </div>
  );
};
