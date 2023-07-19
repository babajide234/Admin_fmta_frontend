//eslint-disable-next-line no-unused-vars
import React from "react";
import AddProductForm from "../forms/AddProductForm";
import GoBack from "../GoBack";
import PropTypes from "prop-types";
// import DashHeader from "./DashHeader";

const DashAddProduct = ({ goBack, edit = false, data = {} }) => {
  // console.log(data);
  return (
    <main className="dashAddProduct">
      <GoBack onClick={goBack}>Go back</GoBack>
      <header className="dashAddProduct__header">
        <h2 className="header__2 secondary">
          {edit ? "Edit Product" : "Add a Product"}
        </h2>
      </header>
      <AddProductForm edit={edit} data={data} />
    </main>
  );
};

DashAddProduct.propTypes = {
  goBack: PropTypes.any,
  edit: PropTypes.bool,
  data: PropTypes.any,
};
export default DashAddProduct;
