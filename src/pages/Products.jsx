//eslint-disable-next-line no-unused-vars
import React from "react";
import Table from "../components/tables/table";
import DashHeader from "../components/Dash/DashHeader";
import { Buttons } from "../components/buttons/Buttons";
import { iconStyle } from "../util/util";
import { ReactComponent as Box } from "../assets/main/icon/box3.svg";

const Products = () => {
  return (
    <div className="dashboardProduct__div-container">
      <div className="dashboardProduct__div-header grid-2 >">
        <DashHeader text="Products" />
        <div className="dashboardProduct__btn">
          <div className="dashboardProduct__btn-container">
            <Buttons
              color={"secondary"}
              type={"link"}
              to={"/return-an-item"}
              style={{ whiteSpace: "nowrap" }}
            >
              <Box style={iconStyle} />
              Add a product
            </Buttons>
          </div>
        </div>
      </div>
      <Table />
    </div>
  );
};

export default Products;
