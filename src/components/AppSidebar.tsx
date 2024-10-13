import Logo from "../assets/svgs/logo-transparent-2.svg";
import NavItem from "./NavLink";

import HomeIcon from "../assets/svgs/home_icon.svg";
import TruckIcon from "../assets/svgs/truck.svg";
import NotificationIcon from "../assets/svgs/notification.svg";

import { useLocation } from "react-router-dom";

const LOCATION_MAPPINGS = {
  home: "/",
  pickup: "/pickups",
  notification: "/notifications",
};

const AppSidebar = () => {
  const { pathname } = useLocation();

  return (
    <aside className="hidden md:block w-64 bg-[#EFEFEF80] fixed h-full z-20">
      <div className="p-4 h-[70px] text-lg font-semibold bg-[#f2f2f2] flex flex-row items-center">
        <div className="flex flex-row gap-2 items-center">
          <Logo height={50} width={50} />
          <h1 className="text-xl">Postera</h1>
        </div>
      </div>

      <nav className="px-4 mt-12">
        <ul className="mt-4 space-y-2">
          <li>
            <NavItem
              label="Home"
              isActive={pathname === LOCATION_MAPPINGS.home}
              route="/"
              Icon={HomeIcon}
            />
          </li>

          <li>
            <NavItem
              label="Notifications"
              route="/notifications"
              Icon={NotificationIcon}
              isActive={pathname.startsWith(LOCATION_MAPPINGS.notification)}
            />
          </li>

          <li>
            <NavItem
              label="Pickups"
              route="/pickups"
              Icon={TruckIcon}
              isActive={pathname.startsWith(LOCATION_MAPPINGS.pickup)}
            />
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default AppSidebar;
