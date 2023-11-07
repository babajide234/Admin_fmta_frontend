import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/navigation/Sidebar";
import DashboardNavbar from "../components/navigation/DashboardNavbar";
import ScrollToTop from "../components/common/ScrollToTop";
import userSlice from "../store/userStore";

const DashLayout = () => {
  const isLoggedIn = userSlice((state) => state.isLoggedIn);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  return (
    <>
      <ScrollToTop />
      <div className=" flex h-screen overflow-y-hidden bg-white">

      <Sidebar />
      <div className="flex flex-col flex-1 h-full overflow-hidden">
        <DashboardNavbar />

        <main className="flex-1 max-h-full p-5 overflow-hidden overflow-y-scroll">
          <Outlet />
        </main>
      </div>
      </div>
    </>
  );
};

export default DashLayout;
