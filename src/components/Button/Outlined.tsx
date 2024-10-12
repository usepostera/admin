import { GlobalButtonProps, OutlinedButtonProps } from "../../@types";
import RippleEffect from "../Ripple";

export const OutlinedButton = (
  props: OutlinedButtonProps & GlobalButtonProps
) => {
  const {
    label,
    type = "button",
    onClick,
    loading,
    disabled,
    prefixIcon,
    className,
  } = props;

  return (
    <RippleEffect
      onClick={onClick}
      className={`
        rounded-[6px] h-[40px] py-[13px] px-[16px] w-full flex justify-center items-center bg-transparent border-[1px] border-[#228B22]
        ${disabled ? "cursor-not-allowed" : ""}
        ${loading ? "cursor-wait" : ""}
        ${className}
      `}
    >
      <button
        className="w-full h-full outline-none border-none flex justify-center items-center"
        type={type}
        disabled={disabled || loading}
      >
        <div className="flex flex-row gap-2 items-center">
          {loading && (
            <div className="loader mr-2"></div> // You can replace this with your loading spinner component
          )}
          {prefixIcon && prefixIcon}
          <p
            className={`text-[16px] leading-[24px] text-[#228B22] font-montserrat font-normal`}
          >
            {label}
          </p>
        </div>
      </button>
    </RippleEffect>
  );
};
