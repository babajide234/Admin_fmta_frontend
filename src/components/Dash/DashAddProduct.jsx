//eslint-disable-next-line no-unused-vars
import React from "react";
import AddProductForm from "../forms/AddProductForm";
import GoBack from "../GoBack";
import PropTypes from "prop-types";
import productSlice from "../../store/productStore";


const DashAddProduct = ({
  goBack,
  edit = false,
  success,
  setSuccess,
  failed,
  setFailed,
  prod,
}) => {
  // console.log(data);
  const product = productSlice((state) => state.product);



  return (
    <main className="dashAddProduct">
      <GoBack
        onClick={() => {
          goBack();
        }}
      >
        Go back
      </GoBack>
      <header className="dashAddProduct__header">
        <h2 className="header__2 secondary">
          {edit ? "Edit Product" : "Add a Product"}
        </h2>
      </header>
      <AddProductForm
        edit={edit}
        data={product}
        close={goBack}
        success={success}
        setSuccess={setSuccess}
        failed={failed}
        setFailed={setFailed}
        prod={prod}
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
  setFailed: PropTypes.func,
  failed: PropTypes.bool,
  prod: PropTypes.object,
};
export default DashAddProduct;
