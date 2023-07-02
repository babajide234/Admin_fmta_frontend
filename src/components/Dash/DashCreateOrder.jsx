// eslint-disable-next-line no-unused-vars
import React from "react";
import GoBack from "../GoBack";

import PropTypes from "prop-types";
import CreateOrderForm from "../forms/CreateOrderForm";
const DashCreateOrder = ({ goBack }) => {
  return (
    <div className="dashCreateOrder">
      <GoBack onClick={goBack}>Go back</GoBack>
      <header className="dashAddProduct__header">
        <h2 className="header__2 secondary">Create new Order</h2>
      </header>
      <CreateOrderForm />
    </div>
  );
};
DashCreateOrder.propTypes = {
  goBack: PropTypes.any,
};
export default DashCreateOrder;
