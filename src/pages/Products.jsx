//eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import Table from "../components/tables/table";
import DashHeader from "../components/Dash/DashHeader";
import { Buttons } from "../components/buttons/Buttons";
import { iconStyle } from "../util/util";
import { ReactComponent as Box } from "../assets/main/icon/box3.svg";
import DashAddProduct from "../components/Dash/DashAddProduct";
import columns from "../components/tables/column";

async function getData() {
  // Fetch data from your API here.
  return [
    {
      name: "Hospital Ward Bed",
      price: 100,
      vendor: "FMT Store",
      type: "retailer",
      date: "2021-01-07 11:50:10",
      approved: "approved",
    },
    {
      name: "Z Z Hospital Ward Bed",
      price: 100,
      vendor: "ACDStore",
      type: "retailer",
      date: "2021-01-07 11:50:10",
      approved: "approved",
    },
    {
      name: "F Hospital Ward Bed",
      price: 100,
      vendor: "DER Store",
      type: "retailer",
      date: "2021-01-07 11:50:10",
      approved: "NA",
    },
    {
      name: "Q Hospital Ward Bed",
      price: 100,
      vendor: "FMT Store",
      type: "retailer",
      date: "2021-01-07 11:50:10",
      approved: "NA",
    },
    {
      name: " W Hospital Ward Bed",
      price: 100,
      vendor: "DER Store",
      type: "retailer",
      date: "2021-01-07 11:50:10",
      approved: "NA",
    },
    {
      name: "Z Hospital Ward Bed",
      price: 100,
      vendor: "ASD Store",
      type: "retailer",
      date: "2021-01-07 11:50:10",
      approved: "approved",
    },
    {
      name: " A Hospital Ward Bed",
      price: 100,
      vendor: "ABC Store",
      type: "retailer",
      date: "2021-01-07 11:50:10",
      approved: "approved",
    },
    {
      name: "D Hospital Ward Bed",
      price: 100,
      vendor: "CVX Store",
      type: "retailer",
      date: "2021-01-07 11:50:10",
      approved: "approved",
    },
    {
      name: "A Hospital Ward Bed",
      price: 100,
      vendor: "DET Store",
      type: "retailer",
      date: "2021-01-07 11:50:10",
      approved: "approved",
    },
    {
      name: "B Hospital Ward Bed",
      price: 100,
      vendor: "FRR Store",
      type: "retailer",
      date: "2021-01-07 11:50:10",
      approved: "approved",
    },
    {
      name: "A Hospital Ward Bed",
      price: 100,
      vendor: "FRRC Store",
      type: "retailer",
      date: "2021-01-07 11:50:10",
      approved: "approved",
    },
    // ...
  ];
}

const Products = () => {
  const [open, setOpen] = useState(false);

  const clickHandler = () => {
    setOpen(() => !open);
  };

  return (
    <>
      {open ? (
        <div>
          <DashAddProduct goBack={clickHandler}/>
        </div>
      ) : (
        <div className="dashboardProduct__div-container">
          <div className="dashboardProduct__div-header flex justify-between items-center">
            <DashHeader text="Products" />
            <div className="dashboardProduct__btn">
              <div className="dashboardProduct__btn-container">
                <Buttons
                  color={"secondary"}
                  type={"btn"}
                  style={{ whiteSpace: "nowrap" }}
                  onClick={clickHandler}
                >
                  <Box style={iconStyle} />
                  Add a product
                </Buttons>
              </div>
            </div>
          </div>
          <Table getData={getData} columns={columns} filter={'name'}/>
        </div>
      )}
    </>
  );
};

export default Products;
