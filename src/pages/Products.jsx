//eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import Table from "../components/tables/table";
import DashHeader from "../components/Dash/DashHeader";
import { Buttons } from "../components/buttons/Buttons";
import { iconStyle } from "../util/util";
import { ReactComponent as Box } from "../assets/main/icon/box3.svg";
import DashAddProduct from "../components/Dash/DashAddProduct";

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
          <div className="dashboardProduct__div-header grid-2 >">
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
          <Table />
        </div>
      )}
    </>
  );
};

export default Products;
