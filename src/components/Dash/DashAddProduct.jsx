//eslint-disable-next-line no-unused-vars
import React from "react";
import AddProductForm from "../forms/AddProductForm";
import GoBack from "../GoBack";
import PropTypes from "prop-types";
// import DashHeader from "./DashHeader";

const DashAddProduct = ({
  goBack,
  edit = false,
  data = {},
  success,
  setSuccess,
  failed,
  setFailed,
}) => {
  // console.log(data);
  return (
    <main className="dashAddProduct">
      <GoBack onClick={goBack}>Go back</GoBack>
      <header className="dashAddProduct__header">
        <h2 className="header__2 secondary">
          {edit ? "Edit Product" : "Add a Product"}
        </h2>
      </header>
      <AddProductForm
        edit={edit}
        data={data}
        close={goBack}
        success={success}
        setSuccess={setSuccess}
        failed={failed}
        setFailed={setFailed}
      />
    </main>
  );
};

DashAddProduct.propTypes = {
  goBack: PropTypes.func,
  edit: PropTypes.bool,
  data: PropTypes.any,
  success: PropTypes.bool,
  setSuccess: PropTypes.func,
  failed: PropTypes.bool,
  setFailed: PropTypes.func,
};
export default DashAddProduct;
