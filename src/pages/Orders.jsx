// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import DashHeader from "../components/Dash/DashHeader";
import { Buttons } from "../components/buttons/Buttons";
import { ReactComponent as Box } from "../assets/main/icon/box3.svg";
import { iconStyle } from "../util/util";
import Table from "../components/tables/table";
import orderColumn from "../components/tables/order/orderColumn";
import DashCreateOrder from "../components/Dash/DashCreateOrder";

async function getData() {
  // Fetch data from your API here.
  return [
    {
      orderId: "FM-10611",
      created: "2021-01-05 11:50:10",
      payment: "Paid",
      customer: "Jude Joshua",
      total: 1120,
      status: "Delivery Done",
    },
    {
      orderId: "FM-10611",
      created: "2021-04-07 11:50:10",
      payment: "Pending",
      customer: "Jude Joshua",
      total: 1120,
      status: "Awaiting Confirmation",
    },
    {
      orderId: "FM-10611",
      created: "2023-07-19 16:47:47",
      payment: "Paid",
      customer: "Jude Joe",
      total: 1120,
      status: "Delivery Done",
    },
    {
      orderId: "FM-10611",
      created: "2021-07-19 16:47:47",
      payment: "pending",
      customer: "Jude Joshua",
      total: 1120,
      status: "Awaiting Confirmation",
    },
    {
      orderId: "FM-10611",
      created: "2021-01-07 11:50:10",
      payment: "Paid",
      customer: "JPrincess Uzoukwu",
      total: 1120,
      status: "Awaiting Confirmation",
    },
  ];
}

const Orders = () => {
  const [open, setOpen] = useState(false);

  const clickHandler = () => {
    setOpen(() => !open);
  };
  return (
    <main className="dashOrders">
      <div className="dashOrders__div-container">
        {open ? (
          <DashCreateOrder goBack={clickHandler}/>
        ) : (
          <>
            {" "}
            <div className="dashOrders__div-header flex justify-between items-center">
              <DashHeader text={"Orders"} />
              <div className="dashboardProduct__btn">
                <div className="dashboardProduct__btn-container">
                  <Buttons
                    color={"secondary"}
                    type={"btn"}
                    style={{ whiteSpace: "nowrap" }}
                    onClick={clickHandler}
                  >
                    <Box style={iconStyle} />
                    Create an Order
                  </Buttons>
                </div>
              </div>
            </div>
            <Table columns={orderColumn} getData={getData} filter={"orderId"} />
          </>
        )}
      </div>
    </main>
  );
};

export default Orders;
