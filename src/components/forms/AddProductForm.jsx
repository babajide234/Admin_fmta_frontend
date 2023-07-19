//eslint-disable-next-line no-unused-vars
import React from "react";
import { Formik, Form } from "formik";
import ProductNameForm from "./addProduct/ProductNameForm";
import ProductSpecForm from "./addProduct/ProductSpecForm";
import OtherDetailsForm from "./addProduct/OtherDetailsForm";
import { Buttons } from "../buttons/Buttons";
import * as Yup from "yup";
import PropTypes from "prop-types";
import sanitizeHtml from "sanitize-html";
import { useMutation } from "react-query";
import productSlice from "../../store/productStore";

function cleanString(dirtyString) {
  const parser = new DOMParser();
  const decodedString = parser.parseFromString(dirtyString, "text/html")
    .documentElement.textContent;
  const cleanedString = sanitizeHtml(decodedString);
  return cleanedString;
}

const AddProductForm = ({ edit = false, data = {} }) => {
  const editProduct = productSlice.getState().editProduct;
  const createProduct = productSlice.getState().createProduct;

  const nameValues = {
    name: edit ? data.name : "",
    moq: edit ? data.moq : "",
    size: "",
    category: edit ? data.category_id : "",
    subCategory: edit ? data.subcategory_id : "",
    brand: "",
    price: edit ? data.price : "",
    currency: edit ? data.currency : "",
    discount: "",
    userRole: "",
    user: edit ? data.user.name : "",
  };

  const specValues = {
    stockQuantity: edit ? data.quantity_in_stock : "",
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
    state: "",
    city: "",
    postal: "",
    address: "",
    hsc: "",
    videoLink: "",
  };

  const otherValues = {
    description: edit ? cleanString(data.description) : "",
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
    discount: Yup.number(),
    stockQuantity: Yup.number().required(),
    stockSize: Yup.string().required(),
    length: Yup.number().required(),
    width: Yup.number().required(),
    height: Yup.number().required(),
    adultOrChild: Yup.number().required(),
    productSize: Yup.string().required(),
    productWeight: Yup.number().required(),
    productColor: Yup.string(),
    modelNum: Yup.string(),
    imported: Yup.string(),
    country: Yup.string(),
    city: Yup.string(),
    state: Yup.string(),
    postal: Yup.number(),
    address: Yup.string(),
    hsc: Yup.string(),
    videoLink: Yup.string(),
    description: Yup.string().required(),
    madeIn: Yup.string().required(),
    manufacturedDate: Yup.date().required(),
    expiryDate: Yup.date(),
    inTheBox: Yup.string().required(),
    userRole: Yup.string().required(),
    user: Yup.string().required(),
  });

  const addMutation = useMutation((data) => createProduct(data), {
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });
  const editMutation = useMutation((data) => editProduct(data), {
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
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
                edit={edit}
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

AddProductForm.propTypes = {
  data: PropTypes.object,
  edit: PropTypes.bool,
};
export default AddProductForm;
