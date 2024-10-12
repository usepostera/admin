import { GlobalButtonProps } from "../../@types";
import RippleEffect from "../Ripple";

export const TextButton = (props: GlobalButtonProps) => {
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
        flex justify-center items-center bg-transparent
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
          {loading ? (
            <div className="loader mr-2"></div> // You can replace this with your loading spinner component
          ) : (
            <>
              {prefixIcon && prefixIcon}
              <p
                className={`text-[14px] leading-[17.07px] text-[#228B22] font-montserrat font-normal`}
              >
                {label}
              </p>
            </>
          )}
        </div>
      </button>
    </RippleEffect>
  );
};
