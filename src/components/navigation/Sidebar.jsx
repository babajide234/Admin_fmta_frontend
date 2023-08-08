import { SIDEBARMENU } from "../../util/util";
import { NavLink } from "react-router-dom";
import { ReactComponent as Home } from "../../assets/main/icon/home.svg";
import { ReactComponent as Shopping_cart } from "../../assets/main/icon/shopping-cart3.svg";
import { ReactComponent as Box } from "../../assets/main/icon/box2.svg";
import { ReactComponent as User } from "../../assets/main/icon/user2.svg";
import { ReactComponent as Heart } from "../../assets/main/icon/Heart4.svg";
import PropTypes from "prop-types";
import { ListTree, Plus } from "lucide-react";
import { UserGear } from "phosphor-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";

const Sidebar = () => {
  const NavLinks = () => {
    return (
      <>
        {SIDEBARMENU.map((item, index) => (
          <NavLink
            key={index}
            to={item.url}
            className={(props) => {
              return props.isActive ? "active-link" : "";
            }}
          >
            <div className={`hospitalSideNav__ul-listItem`}>
              {item.icon === "Home" && <Home />}
              {item.icon === "Box" && <Box />}
              {item.icon === "User" && <User />}
              {item.icon === "Heart" && <Heart />}

              {item.icon === "UserGear" && <UserGear />}
              <span className="hospitalSideNav__ul-span">{item.name}</span>
            </div>
          </NavLink>
        ))}
        <DropdownMenu>
          <DropdownMenuTrigger className="hospitalSideNav__ul-listItem w-full">
            <Shopping_cart />
            <span className="hospitalSideNav__ul-span w-full">
              Product menu
            </span>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="backg-neutral w-[260px] rounded-[32px] border-[1px]">
            <DropdownMenuLabel className="pl-6 header__4 secondary">
              Product Menu List
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <NavLink
                to={"/products"}
                className={(props) => {
                  return props.isActive
                    ? "active-link w-full"
                    : "w-full h-full";
                }}
              >
                <div className={`hospitalSideNav__ul-listItem w-full`}>
                  <Shopping_cart />
                  <span className="hospitalSideNav__ul-span ">Products</span>
                </div>
              </NavLink>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <NavLink
                to={"/categories"}
                className={(props) => {
                  return props.isActive ? "active-link" : "w-full h-full";
                }}
              >
                <div className={`hospitalSideNav__ul-listItem  w-full`}>
                  <ListTree />
                  <span className="hospitalSideNav__ul-span ">Categories</span>
                </div>
              </NavLink>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <NavLink
                to={"/markup"}
                className={(props) => {
                  return props.isActive ? "active-link" : "w-full h-full";
                }}
              >
                <div className={`hospitalSideNav__ul-listItem  w-full`}>
                  <Plus />
                  <span className="hospitalSideNav__ul-span ">Markup</span>
                </div>
              </NavLink>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </>
    );
  };

  return <div className="hospitalSideNav__ul box">{NavLinks()}</div>;
};

Sidebar.propTypes = {
  isActive: PropTypes.bool,
};
export default Sidebar;
