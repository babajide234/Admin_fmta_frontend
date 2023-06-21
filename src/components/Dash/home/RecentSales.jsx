// eslint-disable-next-line no-unused-vars
import React from "react";
import BorderContainer from "../../common/BorderContainer";
import DashHeader from "../DashHeader";
import { Avatar, AvatarFallback, AvatarImage } from "../../../ui/avatar";
import Avatar1 from "../../../assets/avatars/01.png";
import Avatar2 from "../../../assets/avatars/02.png";
import Avatar3 from "../../../assets/avatars/03.png";
import Avatar4 from "../../../assets/avatars/04.png";
import Avatar5 from "../../../assets/avatars/05.png";
import GoForward from "../../GoBack/GoForward";

const RecentSales = () => {
  return (
    <BorderContainer variant="outline">
      <div className="recentSales">
        <div className="flex items-center justify-between gap-4">
          <DashHeader small={true} text="Recent sales" />
          <GoForward text={"Order"} to={"/"} />
        </div>
        <div className="recentSales__div-card">
          <div className="flex items-center  recentSales__div-card-item">
            <Avatar className="h-9 w-9">
              <AvatarImage src={Avatar1} alt="Avatar" />
              <AvatarFallback>OM</AvatarFallback>
            </Avatar>
            <div className="ml-4">
              <p className="text-sm font-medium leading-none">Olivia Martin</p>
              <p className="text-sm text-muted-foreground">
                olivia.martin@email.com
              </p>
            </div>
            <div className="ml-auto font-bold">+$1,999.00</div>
          </div>
          <div className="flex items-center  recentSales__div-card-item">
            <Avatar className="h-9 w-9">
              <AvatarImage src={Avatar2} alt="Avatar" />
              <AvatarFallback>OM</AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">Olivia Martin</p>
              <p className="text-sm text-muted-foreground">
                olivia.martin@email.com
              </p>
            </div>
            <div className="ml-auto font-bold">+$1,999.00</div>
          </div>
          <div className="flex items-center  recentSales__div-card-item">
            <Avatar className="h-9 w-9">
              <AvatarImage src={Avatar3} alt="Avatar" />
              <AvatarFallback>OM</AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">Olivia Martin</p>
              <p className="text-sm text-muted-foreground">
                olivia.martin@email.com
              </p>
            </div>
            <div className="ml-auto font-bold">+$1,999.00</div>
          </div>
          <div className="flex items-center  recentSales__div-card-item">
            <Avatar className="h-9 w-9">
              <AvatarImage src={Avatar4} alt="Avatar" />
              <AvatarFallback>OM</AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">Olivia Martin</p>
              <p className="text-sm text-muted-foreground ">
                olivia.martin@email.com
              </p>
            </div>
            <div className="ml-auto font-bold ">+$1,999.00</div>
          </div>
          <div className="flex items-center recentSales__div-card-item">
            <Avatar className="h-9 w-9">
              <AvatarImage src={Avatar5} alt="Avatar" />
              <AvatarFallback>OM</AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">Olivia Martin</p>
              <p className="text-sm text-muted-foreground">
                olivia.martin@email.com
              </p>
            </div>
            <div className="ml-auto font-bold">+$1,999.00</div>
          </div>
        </div>
      </div>
    </BorderContainer>
  );
};

export default RecentSales;
