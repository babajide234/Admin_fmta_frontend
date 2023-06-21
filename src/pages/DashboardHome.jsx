//eslint-disable-next-line no-unused-vars
import React from "react";
import DashHeader from "../components/Dash/DashHeader";
import SmallCard from "../components/Card/SmallCard";
import { CurrencyNgn } from "phosphor-react";
import { CreditCard, Truck } from "lucide-react";
import DashOverview from "../components/Dash/chart/DashOverview";
import RecentSales from "../components/Dash/home/RecentSales";
// import CurrentDate from "../components/common/CurrentDate";

const DashboardHome = () => {
  return (
    <main className="dashAdminHome">
      <div className="dashAdminHome__div-header">
        <DashHeader text={"Dashboard"} />
        {/* <CurrentDate /> */}
      </div>
      <section className="dashAdminHome__section-card grid-3">
        <SmallCard
          title={"Total Revenue"}
          text="$45,231.89"
          subText="+20.1% from last month"
          icon={<CurrencyNgn />}
          variant={"outline"}
        />
        <SmallCard
          title={"Sales"}
          text="$45,231.89"
          subText="+20.1% from last month"
          icon={<CreditCard />}
          variant={"outline"}
        />
        <SmallCard
          title={"Delivered order"}
          text="$45,231.89"
          subText="+20.1% from last month"
          icon={<Truck />}
          variant={"outline"}
        />
      </section>
      <section className="dashAdminHome__section-content flex gap-8 ">
        <div>
          <DashOverview />
        </div>
        <div>
          <RecentSales />
        </div>
      </section>
    </main>
  );
};

export default DashboardHome;
