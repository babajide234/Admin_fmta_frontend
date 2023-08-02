//eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { Formik, Form } from "formik";
import ProductNameForm from "./addProduct/ProductNameForm";
import ProductSpecForm from "./addProduct/ProductSpecForm";
import OtherDetailsForm from "./addProduct/OtherDetailsForm";
import { Buttons } from "../buttons/Buttons";
import * as Yup from "yup";
import PropTypes from "prop-types";
import sanitizeHtml from "sanitize-html";
import { useMutation, useQuery } from "react-query";
import productSlice from "../../store/productStore";
import miscSlice from "../../store/miscSlice";
import { getNameByIsoCode } from "../../util/util";

function cleanString(dirtyString) {
  const parser = new DOMParser();
  const decodedString = parser.parseFromString(dirtyString, "text/html")
    .documentElement.textContent;
  const cleanedString = sanitizeHtml(decodedString);
  return cleanedString;
}

const AddProductForm = ({
  edit = false,
  data = {},
  close,
  success,
  setSuccess,
  failed,
  setFailed,
}) => {
  const [countryCode, setCountryCode] = useState("");
  const [stateCode, setStateCode] = useState("");

  const [imgArray, setImgArray] = useState([]);
  // const [successData, setSuccessData] = useState([]);

  //product id
  const prodId = edit ? data?.id : "";

  //states from store
  const createProduct = productSlice.getState().createProduct;
  const editProduct = productSlice.getState().editProduct;
  const getCountry = miscSlice((state) => state.getCountry);
  const getState = miscSlice((state) => state.getState);
  const getCity = miscSlice((state) => state.getCity);

  //formik initialvalues divided into sections based on components
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
    userId: edit ? data.user_id : "",
  };

  const specValues = {
    stockQuantity: edit ? data.quantity_in_stock : "",
    stockSize: "",
    length: "",
    width: "",
    height: "",
    adultOrChild: "",
    productSizes: "",
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
    condition: "",
    warranty: "",
    images: [],
  };

  const otherValues = {
    description: edit ? cleanString(data.description) : "",
    madeIn: "",
    manufacturedDate: "",
    expiryDate: "",
    inTheBox: "",
  };

  //combined formik initialvalues
  const combinedInitialValues = {
    ...nameValues,
    ...specValues,
    ...otherValues,
  };

  //yup for form validation
  const AddProductSchema = Yup.object().shape({
    name: Yup.string().required(),
    moq: Yup.number().required(),
    size: Yup.string().required(),
    category: Yup.string().required(),
    subCategory: Yup.string().required(),
    brand: Yup.string().required(),
    price: Yup.string().required(),
    currency: Yup.string().required(),
    condition: Yup.string().required(),
    discount: Yup.number(),
    stockQuantity: Yup.number().required(),
    stockSize: Yup.string().required(),
    length: Yup.number().required(),
    width: Yup.number().required(),
    height: Yup.number().required(),
    adultOrChild: Yup.string().required(),
    productSizes: Yup.string(),
    productWeight: Yup.number().required(),
    productColor: Yup.string().required(),
    modelNum: Yup.string(),
    imported: Yup.string().required(),
    country: Yup.string(),
    city: Yup.string(),
    state: Yup.string(),
    postal: Yup.number(),
    address: Yup.string(),
    hsc: Yup.string(),
    videoLink: Yup.string(),
    warranty: Yup.string(),
    description: Yup.string().required(),
    madeIn: Yup.string().required(),
    manufacturedDate: Yup.date(),
    expiryDate: Yup.date(),
    inTheBox: Yup.string().required(),
    userRole: Yup.string(),
    userId: Yup.string(),
    images: Yup.array(),
  });

  //data for countries
  const { data: countries, isLoading: countryLoading } = useQuery(
    "getCountry",
    async () => {
      const response = await getCountry();
      return response;
    }
  );
  //data for stats
  const { data: states, isLoading: stateLoading } = useQuery(
    ["getStateQuery", countryCode],
    async () => {
      const response = await getState(countryCode);
      return response;
    },
    {
      enabled: countryCode !== "",
    }
  );
  //data for cities
  const { data: cities, isLoading: cityLoading } = useQuery(
    ["getCityQuery", stateCode],
    async () => {
      const response = await getCity(stateCode);
      return response;
    },
    {
      enabled: stateCode !== "",
    }
  );

  //add product post function using react-query
  const addMutation = useMutation((data) => createProduct(data), {
    onSuccess: (data) => {
      if (data?.status) {
        setSuccess(!success);
      } else {
        setFailed(!failed);
      }
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  //edit product post function using react-query
  const editMutation = useMutation((data) => editProduct(prodId, data), {
    onSuccess: (data) => {
      if (data?.status) {
        setSuccess(!success);
      } else {
        setFailed(!failed);
      }
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  //formik onSubmit function handler
  const handleSubmit = (values, { resetForm, setSubmitting }) => {
    const formData = {
      name: values.name,
      description: values.description,
      price: values.price,
      currency: values.currency,
      moq: values.moq,
      quantity_in_stock: values.stockQuantity,
      discount: values.discount,
      user_id: values.userId,
      category_id: values.category,
      subcategory_id: values.subCategory,
      quantity_size: values.size,
      brand: values.brand,
      featured: true,
      in_the_box: values.inTheBox,
      size: values.size,
      sizes: values.productSizes,
      weight: values.productWeight,
      color: values.productColor,
      model_number: values.modelNum,
      production_country: values.madeIn,
      product_shipped: values.imported === "Yes" ? true : false,
      product_dimension: `${values.length}x${values.width}x${values.width}`,
      product_shipped_address: values.address,
      product_shipped_city: values.city,
      product_shipped_state: getNameByIsoCode(values.state, states),
      product_shipped_postal: values.postal,
      product_shipped_country:
        values.imported === "No"
          ? "Nigeria"
          : getNameByIsoCode(values.country, countries),
      product_shipped_hsc: values.hsc,
      product_manufacture: values.manufacturedDate,
      product_expiry: values.expiryDate,
      product_warranty: values.warranty,
      product_condition: values.condition,
      product_training: "",
      adult_children: values.adultOrChild,
      images: [...imgArray],
    };
    // console.log(formData);
    if (edit) {
      editMutation.mutate(formData);
      // editProduct(prodId, formData);
    } else {
      addMutation.mutate(formData);
    }
    setSubmitting(false);
    resetForm();
    close();
  };
  return (
    <>
      <Formik
        initialValues={combinedInitialValues}
        validationSchema={AddProductSchema}
        onSubmit={handleSubmit}
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
                imgArray={imgArray}
                setImgArray={setImgArray}
                setFieldValue={setFieldValue}
              />
              <ProductSpecForm
                values={values}
                touched={touched}
                errors={errors}
                handleChange={handleChange}
                setCountryCode={setCountryCode}
                setStateCode={setStateCode}
                countries={countries}
                states={states}
                cities={cities}
                countryLoading={countryLoading}
                stateLoading={stateLoading}
                cityLoading={cityLoading}
              />
              <OtherDetailsForm
                values={values}
                touched={touched}
                errors={errors}
                handleChange={handleChange}
                setFieldValue={setFieldValue}
              />
            </div>
            <div className="btn-container py-6">
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
  close: PropTypes.func,
  success: PropTypes.bool,
  setSuccess: PropTypes.func,
  failed: PropTypes.bool,
  setFailed: PropTypes.func,
};
export default AddProductForm;
