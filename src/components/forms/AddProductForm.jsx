//eslint-disable-next-line no-unused-vars
import React from "react";
import { Formik, Form } from "formik";
import ProductNameForm from "./addProduct/ProductNameForm";
import ProductSpecForm from "./addProduct/ProductSpecForm";

const AddProductForm = () => {
  return (
    <>
      <Formik>
        {({ handleSubmit }) => (
          <Form>
            <div className="">
              <ProductNameForm onSubmit={handleSubmit} />
              <ProductSpecForm />
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default AddProductForm;
