import { SIDEBARMENU } from "../../util/util";
import { NavLink } from "react-router-dom";
import { ReactComponent as Home } from "../../assets/main/icon/home.svg";
import { ReactComponent as Shopping_cart } from "../../assets/main/icon/shopping-cart3.svg";
import { ReactComponent as Box } from "../../assets/main/icon/box2.svg";
import { ReactComponent as User } from "../../assets/main/icon/user2.svg";
import { ReactComponent as Heart } from "../../assets/main/icon/Heart4.svg";
import PropTypes from "prop-types";
import { ListTree, Plus } from "lucide-react";
import { CaretDown, UserGear } from "phosphor-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import LogoComponent from "../common/LogoComponent";
import { Item } from "@radix-ui/react-dropdown-menu";

const Sidebar = () => {
  const NavLinks = () => {
    return (
      <>
        {SIDEBARMENU.map((item, index) => {
          if('children' in item){
            return(
              <DropdownMenu key={index}>
                <DropdownMenuTrigger className=" relative flex items-center w-full justify-start px-12 text-lg py-3 rounded-lg hover:bg-[#f1f6ff] text-[#6f7e80] outline-none bottom-0 ">
                  <Shopping_cart />
                  <span className="ml-5">
                    {item.name}
                  </span>
                  <CaretDown size={20} className=" absolute right-3 top-4"/>
                </DropdownMenuTrigger>
                <DropdownMenuContent className=" border border-solid border-gray-500/20 bg-white w-[13rem] mx-auto">
                    <DropdownMenuLabel className="">
                      Product Menu List
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {
                      item.children.map((child,childIndex) =>{
                        return (
                          <DropdownMenuItem key={`${child.name}_${childIndex}`}>
                            <NavLink
                              to={child.url}
                              className={`flex items-center w-full justify-start px-5 text-lg py-3 rounded-lg hover:bg-[#f1f6ff] text-[#6f7e80] `}
                            >
                                <Shopping_cart />
                                <span className="ml-5">{child.name}</span>
                            </NavLink>
                          </DropdownMenuItem>
                        )
                      })
                    }
                </DropdownMenuContent>
              </DropdownMenu>
            )
          }else{

            return (
              <NavLink
                key={index}
                to={item.url}
                className={` flex items-center w-full justify-start px-12 text-lg py-3 rounded-lg hover:bg-[#f1f6ff] text-[#6f7e80] `}
              >
                  {item.icon === "Home" && <Home />}
                  {item.icon === "Box" && <Box />}
                  {item.icon === "User" && <User />}
                  {item.icon === "Heart" && <Heart />}
                  {item.icon === "UserGear" && <UserGear />}
                  {item.icon === "Account" && <UserGear />}
                  <span className="ml-5">{item.name}</span>
              </NavLink>
            )
          }
        })}
        
  
      </>
    );
  };

  return( 
  <div className="fixed inset-y-0 z-10 flex flex-col flex-shrink-0 w-64 max-h-screen overflow-hidden transition-all transform
   bg-white border-r shadow-lg lg:z-auto lg:static lg:shadow-none px-5
   border-solid border-gray-500/20
   ">
    {/* sidebar_header*/}
    <div className="flex items-center justify-between flex-shrink-0 py-8 ">
      <LogoComponent />
    </div>
    {/* sidebar_links */}
    <nav className="flex-1 overflow-hidden hover:overflow-y-auto">
      {NavLinks()}
    </nav>
    {/* sidebar_footer */}
    .
    </div>);
};

Sidebar.propTypes = {
  isActive: PropTypes.bool,
};
export default Sidebar;
