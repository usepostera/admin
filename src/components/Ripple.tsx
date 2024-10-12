"use client";
import React, {
  useState,
  useRef,
  ReactNode,
  MouseEvent,
  HTMLAttributes,
} from "react";

interface Ripple {
  x: number;
  y: number;
  size: number;
}

type RippleEffectProps = {
  children: ReactNode;
  onClick?: VoidFunction;
  className?: string;
  disabled?: boolean;
  skipDelay?: boolean;
} & HTMLAttributes<HTMLDivElement>;

const RippleEffect: React.FC<RippleEffectProps> = ({
  children,
  onClick,
  className,
  disabled,
  skipDelay = false,
  ...others
}) => {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const rippleContainerRef = useRef<HTMLDivElement | null>(null);

  const createRipple = (event: MouseEvent<HTMLDivElement>) => {
    if (!rippleContainerRef.current || disabled) return;

    const rippleContainer = rippleContainerRef.current;
    const size = rippleContainer.offsetWidth;
    const pos = rippleContainer.getBoundingClientRect();
    const x = event.clientX - pos.left - size / 2;
    const y = event.clientY - pos.top - size / 2;

    const newRipple: Ripple = { x, y, size };

    setRipples((prevRipples) => [...prevRipples, newRipple]);

    if (onClick && skipDelay) {
      onClick();
    }

    // Remove the ripple after animation
    setTimeout(() => {
      setRipples((prevRipples) => prevRipples.slice(1));
      if (onClick && !skipDelay) {
        onClick();
      }
    }, 300);
  };

  return (
    <div
      {...others}
      className={`ripple-container ${className}`}
      ref={rippleContainerRef}
      onClick={createRipple}
    >
      {children}
      {ripples.map((ripple, index) => (
        <span
          key={index}
          className="ripple"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: ripple.size,
            height: ripple.size,
          }}
        />
      ))}
    </div>
  );
};

export default RippleEffect;
