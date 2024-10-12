import { Outlet } from "react-router-dom";

const AuthWrapper = () => {
  return (
    <div className="relative h-screen w-full">
      <div className="absolute top-0 left-0 h-full w-full bottom-0 inset-0 bg-[url('/pngs/image1.png')] bg-cover bg-center blur-sm"></div>

      <div className="relative z-10 h-full overflow-y-scroll py-[100px]">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthWrapper;
