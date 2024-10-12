import { Outlet } from "react-router-dom";
import AppHeader from "./AppHeader";
import AppSidebar from "./AppSidebar";
import { Toaster } from "react-hot-toast";

const AppWrapper = () => {
  return (
    <>
      <Toaster />

      <div className="flex h-screen">
        <AppSidebar />

        {/* Main Content with Header */}
        <div className="flex-1 md:ml-64">
          <AppHeader />

          {/* Content */}
          <main className="md:p-6 mt-16">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
};

export default AppWrapper;
