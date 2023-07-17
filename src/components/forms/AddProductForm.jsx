//eslint-disable-next-line no-unused-vars
import React from "react";
import { Formik, Form } from "formik";
import ProductNameForm from "./addProduct/ProductNameForm";
import ProductSpecForm from "./addProduct/ProductSpecForm";
import OtherDetailsForm from "./addProduct/OtherDetailsForm";
import { Buttons } from "../buttons/Buttons";
import * as Yup from "yup";

const AddProductForm = () => {
  const nameValues = {
    name: "",
    moq: "",
    size: "",
    category: "",
    subCategory: "",
    brand: "",
    price: "",
    currency: "",
    discount: "",
    userRole: "",
    user: "",
  };

  const specValues = {
    stockQuantity: "",
    stockSize: "",
    length: "",
    width: "",
    height: "",
    adultOrChild: "",
    productSize: "",
    productWeight: "",
    productColor: "",
    modelNum: "",
    imported: "",
    country: "",
    city: "",
    postal: "",
    address: "",
    hsc: "",
    videoLink: "",
  };

  const otherValues = {
    description: "",
    madeIn: "",
    manufacturedDate: "",
    expiryDate: "",
    inTheBox: "",
  };
  const combinedInitialValues = {
    ...nameValues,
    ...specValues,
    ...otherValues,
  };
  const AddProductSchema = Yup.object().shape({
    name: Yup.string().required(),
    moq: Yup.number().required(),
    size: Yup.string().required(),
    category: Yup.string().required(),
    subCategory: Yup.string().required(),
    brand: Yup.string().required(),
    price: Yup.number().required(),
    currency: Yup.string().required(),
    discount: Yup.number().required(),
    stockQuantity: Yup.number().required(),
    stockSize: Yup.string().required(),
    length: Yup.number().required(),
    width: Yup.number().required(),
    height: Yup.number().required(),
    adultOrChild: Yup.number().required(),
    productSize: Yup.string().required(),
    productWeight: Yup.number().required(),
    productColor: Yup.string().required(),
    modelNum: Yup.string().required(),
    imported: Yup.string().required(),
    country: Yup.string().required(),
    city: Yup.string().required(),
    postal: Yup.number().required(),
    address: Yup.string().required(),
    hsc: Yup.string().required(),
    videoLink: Yup.string().required(),
    description: Yup.string().required(),
    madeIn: Yup.string().required(),
    manufacturedDate: Yup.date().required(),
    expiryDate: Yup.date().required(),
    inTheBox: Yup.string().required(),
    userRole: Yup.string().required(),
    user: Yup.string().required(),
  });

  const onSubmit = (values, { setSubmitting }) => {
    console.log(values);
    setSubmitting(false);
  };
  return (
    <>
      <Formik
        initialValues={combinedInitialValues}
        validationSchema={AddProductSchema}
        onSubmit={onSubmit}
      >
        {({
          values,
          touched,
          errors,
          setFieldValue,
          handleChange,
          submitForm,
        }) => (
          <Form>
            <div className="">
              <ProductNameForm
                values={values}
                touched={touched}
                errors={errors}
                handleChange={handleChange}
              />
              <ProductSpecForm
                values={values}
                touched={touched}
                errors={errors}
                handleChange={handleChange}
              />
              <OtherDetailsForm
                values={values}
                touched={touched}
                errors={errors}
                handleChange={handleChange}
                setFieldValue={setFieldValue}
              />
            </div>
            <div className="btn-container">
              <Buttons
                type={"submit"}
                color={"primary"}
                onClick={() => submitForm()}
              >
                Submit
              </Buttons>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default AddProductForm;
