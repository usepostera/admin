import React, { SVGProps, useEffect, useState } from "react";
import { Link } from "react-router-dom";

type NavItemProps = {
  label: string;
  Icon: React.FunctionComponent<SVGProps<SVGSVGElement>>;
  route?: string;
  isActive?: boolean;
};

const NavItem: React.FC<NavItemProps> = (props) => {
  const { label, Icon, route, isActive = false } = props;

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    return () => setIsOpen(false);
  }, []);

  useEffect(() => {
    if (!isActive && isOpen) {
      setIsOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive]);

  return (
    <Link to={route ?? "#"} className="w-full">
      <button
        type="button"
        className={`transition-all duration-300 ease-in-out py-[8px] ps-[16px] pe-[40px] w-full rounded-[5px] h-[40px] ${
          !isActive ? "bg-transparent" : "bg-primary"
        }`}
      >
        <div className="flex flex-row justify-start items-center w-full gap-4">
          <Icon
            color={isActive ? "#ffffff" : "#000000"}
            height={20}
            width={20}
          />

          <span
            className={`block text-[14px] leading-[17.5px] font-normal font-montserrat transition-all duration-300 ease-in-out ${
              !isActive ? "text-[#000000]" : "text-[#ffffff]"
            }`}
          >
            {label}
          </span>
        </div>
      </button>
    </Link>
  );
};

export default NavItem;
