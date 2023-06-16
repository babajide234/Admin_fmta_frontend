//eslint-disable-next-line no-unused-vars
import React from "react";
import AddProductForm from "../forms/AddProductForm";
import GoBack from "../GoBack";
import PropTypes from "prop-types";
// import DashHeader from "./DashHeader";

const DashAddProduct = ({ goBack }) => {
  return (
    <main className="dashAddProduct">
      <header className="dashAddProduct__header">
        <GoBack onClick={goBack}>GoBack</GoBack>
      </header>
      <AddProductForm />
    </main>
  );
};
DashAddProduct.propTypes = {
  goBack: PropTypes.any,
};
export default DashAddProduct;
