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
      <DashboardNavbar />
      <main className="hospitalLayout__main">
        <div className="hospitalLayout__div-sidenav">
          <Sidebar />
        </div>
        <div className="hospitalLayout__div-outlet">
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default DashLayout;
