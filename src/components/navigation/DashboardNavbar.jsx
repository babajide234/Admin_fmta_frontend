// import  from 'react'

import { ReactComponent as Notification } from "../../assets/main/icon/notification.svg";
import { ReactComponent as Logout } from "../../assets/main/icon/logout.svg";
import userSlice from "../../store/userStore";

const DashboardNavbar = () => {
  const logout = userSlice((state) => state.logout);
  const logoutHandler = () => {
    logout();
  };

  return (
    <nav className="flex-shrink-0 border-b py-5 px-5 border-solid border-gray-500/20">
      <main className=" flex justify-end">
        {/* <div className="navber__spacer"></div> */}
        <div className=" grid gap-5 grid-cols-2 grid-rows-1">
          <button className="navbar__notification">
            <Notification />
            <span className="navbar__span-notify">Notifications</span>
          </button>
          <button className="navbar__notification" onClick={logoutHandler}>
            <Logout />
            <span className="navbar__span-notify">Logout</span>
          </button>
        </div>
      </main>
    </nav>
  );
};

export default DashboardNavbar;
