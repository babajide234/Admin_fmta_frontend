import { SIDEBARMENU } from "../../util/util";
import { NavLink } from "react-router-dom";
import { ReactComponent as Home } from "../../assets/main/icon/home.svg";
import { ReactComponent as Shopping_cart } from "../../assets/main/icon/shopping-cart3.svg";
import { ReactComponent as Box } from "../../assets/main/icon/box2.svg";
import { ReactComponent as User } from "../../assets/main/icon/user2.svg";
// import { ReactComponent as Heart } from "../../assets/main/icon/Heart4.svg";

import PropTypes from "prop-types";
import { ListTree, Plus } from "lucide-react";

const Sidebar = () => {
  const NavLinks = () => {
    return SIDEBARMENU.map((item, index) => (
      <NavLink
        key={index}
        to={item.url}
        className={(props) => {
          return props.isActive ? "active-link" : "";
        }}>
        <div className={`hospitalSideNav__ul-listItem `}>
          {item.icon === "Home" && <Home />}
          {item.icon === "Shopping_cart" && <Shopping_cart />}
          {item.icon === "Box" && <Box />}
          {item.icon === "User" && <User />}
          {item.icon === "Heart" && <User />}
          {item.icon === "Plus" && <Plus />}
          {item.icon === "List" && <ListTree />}
          <span className="hospitalSideNav__ul-span">{item.name}</span>
        </div>
      </NavLink>
    ));
  };

  return <div className="hospitalSideNav__ul box">{NavLinks()}</div>;
};

Sidebar.propTypes = {
  isActive: PropTypes.bool,
};
export default Sidebar;
