import { ContainedButtonProps, GlobalButtonProps } from "../../@types";
import RippleEffect from "../Ripple";

export const ContainedButton = (
  props: GlobalButtonProps & ContainedButtonProps
) => {
  const {
    label,
    type = "button",
    onClick,
    loading,
    disabled,
    prefixIcon,
    className,
    form,
  } = props;

  return (
    <RippleEffect
      onClick={onClick}
      className={`
        rounded-[6px] h-[40px] py-[13px] px-[12px] w-full flex justify-center items-center bg-[#228B22]
        ${disabled ? "cursor-not-allowed" : ""}
        ${loading ? "cursor-wait" : ""}
        ${className}
      `}
    >
      <button
        className="w-full h-full outline-none border-none flex justify-center items-center"
        type={type}
        form={form}
        disabled={disabled || loading}
      >
        <div className="flex flex-row gap-2 items-center">
          {loading && (
            <div className="loader mr-2"></div> // You can replace this with your loading spinner component
          )}
          {prefixIcon && prefixIcon}
          <p className={`text-[16px] leading-[24px] text-white`}>{label}</p>
        </div>
      </button>
    </RippleEffect>
  );
};
