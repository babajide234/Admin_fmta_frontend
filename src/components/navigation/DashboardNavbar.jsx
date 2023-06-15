// import  from 'react'

import { ReactComponent as Notification } from "../../assets/main/icon/notification.svg";
import { ReactComponent as Logout } from "../../assets/main/icon/logout.svg";
import LogoComponent from "../common/LogoComponent";
import userSlice from "../../store/userStore";

const DashboardNavbar = () => {
  const logout = userSlice((state) => state.logout);
  const logoutHandler = () => {
    logout();
  };

  return (
    <nav className="navbar">
      <main className="navbar__container">
        <div className="navbar__logo">
          <LogoComponent />
        </div>
        {/* <div className="navber__spacer"></div> */}
        <div className="navbar__right">
          <div className="navbar__notification">
            <Notification />
            <span className="navbar__span-notify">Notifications</span>
          </div>
          <div className="navbar__notification" onClick={logoutHandler}>
            <Logout />
            <span className="navbar__span-notify">Logout</span>
          </div>
        </div>
      </main>
    </nav>
  );
};

export default DashboardNavbar;
