// eslint-disable-next-line no-unused-vars
import React from "react";
import DashHeader from "../components/Dash/DashHeader";
import AccountCard from "../components/Card/AccountCard";
import { CardDetail3 } from "../util/util";
import { ReactComponent as Profile3 } from "../assets/main/icon/profile3.svg";

import { ReactComponent as Building } from "../assets/main/icon/building.svg";

const Account = () => {
  return (
    <main className="account">
      <DashHeader
        text="Account Settings"
        subText={`Make changes to your FirstMedtrade account. `}
      />
      <section className="hospitalHome__content">
        <AccountCard
          icon={<Profile3 />}
          text={CardDetail3[0].text}
          subText={CardDetail3[0].subText}
          to={CardDetail3[0].to}
          btn={CardDetail3[0].btn}
          btnColor="primary"
          titleColor="secondary"
          pad="small"
          small={true}
          settings={true}
        />

        <AccountCard
          icon={<Building />}
          text={CardDetail3[1].text}
          subText={CardDetail3[1].subText}
          to={CardDetail3[1].to}
          btn={CardDetail3[1].btn}
          btnColor="primary"
          titleColor="secondary"
          pad="small"
          small={true}
          settings={true}
        />
      </section>
    </main>
  );
};

export default Account;
