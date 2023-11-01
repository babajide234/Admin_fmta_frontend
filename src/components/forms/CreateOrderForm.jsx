// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { Form, Formik } from "formik";
import InputIcons, {
  CustomSelectButton,
  TextAreaIcon,
} from "../common/InputIcons";
import { ReactComponent as Edit } from "../../assets/main/icon/edit-2.svg";
import { UNITS } from "../../util/util";
import { Buttons } from "../buttons/Buttons";
import { ReactComponent as Delete } from "../../assets/main/icon/deleteIcon.svg";
import { useQuery } from "react-query";
import miscSlice from "../../store/miscSlice";
import Searchbar from "../Search";

const CreateOrderForm = () => {
  const [productArray, setProductArray] = useState([]);
  const [stateCode, setStateCode] = useState("");
  const [cityCode, setCityCode] = useState("");
  const getCountry = miscSlice((state) => state.getCountry);
  const getState = miscSlice((state) => state.getState);
  const getCity = miscSlice((state) => state.getCity);

  const initialValues = {
    product: [],
    name: "",
    email: "",
    country: "",
    phone: "",
    state: "",
    city: "",
    address: "",
  };

  const { data: countries, isLoading: countriesLoading } = useQuery(
    "getCountries",
    () => getCountry()
  );

  const { data: states, isLoading: statesLoading } = useQuery(
    ["getStates", stateCode],
    () => getState(stateCode),
    {
      enabled: stateCode !== "",
    }
  );

  const { data: cities, isLoading: citiesLoading } = useQuery(
    ["getCities", cityCode],
    () => getCity(cityCode),
    {
      enabled: cityCode !== "",
    }
  );
  const onSubmit = (values, { resetForm, setSubmitting }) => {
    console.log(values);
    resetForm();
    setSubmitting(false);
  };

  return (
    <div className="createOrderForm">
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ values, touched, errors, handleChange, submitForm }) => (
          <Form>
            <div className="input-container">
              <InputIcons
                inputName={"name"}
                placeholder={"Customer Name"}
                value={values.name}
                onChange={handleChange}
                type={"text"}
                err={errors.name && touched.name}
                iconRight={<Edit />}
              />
            </div>
            <div className="input-container">
              <InputIcons
                inputName={"email"}
                type={"email"}
                placeholder={"Customer Email"}
                value={values.email}
                onChange={handleChange}
                err={errors.email && touched.email}
                iconRight={<Edit />}
              />
            </div>
            <div className="input-container">
              <InputIcons
                inputName={"phone"}
                placeholder={"Customer Phone number"}
                value={values.phone}
                onChange={handleChange}
                type={"number"}
                err={errors.phone && touched.phone}
                iconRight={<Edit />}
              />
            </div>
            <div className="input-container">
              <CustomSelectButton
                name={"country"}
                label={"Countries"}
                value={values.country}
                onChange={(e) => {
                  setStateCode(e.target.value);
                  handleChange(e);
                }}
                loading={countriesLoading}
                err={errors.country && touched.country}
              >
                <option value="" disabled>
                  Select user country
                </option>
                {countries &&
                  countries?.map((option, index) => (
                    <option
                      key={index}
                      value={option.isoCode}
                      className="py-4 text-md hover:bg-lightPrimary"
                    >
                      {option.name}
                    </option>
                  ))}
              </CustomSelectButton>
            </div>
            <div className="input-container">
              <CustomSelectButton
                name={"state"}
                label={"States"}
                value={values.state}
                onChange={(e) => {
                  setCityCode(e.target.value);
                  handleChange(e);
                }}
                err={errors.state && touched.state}
                isLoading={statesLoading}
              >
                <option value="" disabled>
                  Select user state
                </option>
                {states &&
                  states?.map((option, index) => (
                    <option
                      key={index}
                      value={option.isoCode}
                      className="py-4 text-md hover:bg-lightPrimary"
                    >
                      {option.name}
                    </option>
                  ))}
              </CustomSelectButton>
            </div>
            <div className="input-container">
              <CustomSelectButton
                name={"city"}
                label={"Cities"}
                value={values.city}
                onChange={handleChange}
                err={errors.city && touched.city}
                loading={citiesLoading}
              >
                <option value="" disabled>
                  Select user city
                </option>
                {cities &&
                  cities?.map((option, index) => (
                    <option
                      key={index}
                      value={option.isoCode}
                      className="py-4 text-md hover:bg-lightPrimary"
                    >
                      {option.name}
                    </option>
                  ))}
              </CustomSelectButton>
            </div>

            <div className="input-container">
              <TextAreaIcon
                inputName={"address"}
                placeholder={"Address"}
                value={values.address}
                onChange={handleChange}
                err={errors.address && touched.address}
                iconRight={<Edit />}
              />
            </div>

            <>
              <div className="input-container">
                <Searchbar
                  productArray={productArray}
                  setProductArray={setProductArray}
                />
              </div>
              <div className="grid-2">
                <div className="input-container">
                  <InputIcons
                    name={`quantity`}
                    type="number"
                    placeholder="quantity"
                    value={values.quantity}
                    err={errors.quantity && touched.quantity}
                    iconRight={<Edit />}
                  />
                </div>
                <div className="input-container">
                  <CustomSelectButton
                    name={`unit`}
                    value={values.unit}
                    onChange={handleChange}
                    err={errors.unit && touched.unit}
                    label="Unit"
                  >
                    <option value="" disabled selected hidden>
                      Select a unit
                    </option>
                    {UNITS.map((option) => (
                      <option
                        key={option.id}
                        value={option.name}
                        className="py-4 text-md hover:bg-lightPrimary"
                      >
                        {option.name}
                      </option>
                    ))}
                  </CustomSelectButton>
                </div>
              </div>

              <div className="btn-container w-min">
                <Buttons
                  type="submit"
                  color="secondary"
                  onClick={() => {
                    const list = {
                      name: values.productName,
                      quantity: values.quantity,
                      unit: values.unit,
                    };
                    productArray.push(list);
                  }}
                >
                  Add to list
                </Buttons>
              </div>

              {productArray.length > 0 && (
                <div className="w-2/6">
                  <p className="p3 secondary">Selected Products</p>
                  <div className="grid-3 py-4">
                    <p className="header__5 tertiary">Product</p>
                    <p className="header__5 tertiary">Quantity</p>
                    <p></p>
                  </div>
                  {productArray.map((product, index) => (
                    <div key={index} className="grid-3 items-center">
                      <span className="p4 tertiary">{product.name}</span>
                      <p className="p4 tertiary">
                        {product.quantity} <span>{product.unit}</span>
                      </p>
                      <span
                        className="rounded-md px-1 py-1 hover:bg-red-400 flex place-content-center w-min"
                        onClick={() => {
                          const updatedProductArray = [...productArray];
                          updatedProductArray.splice(index, 1); // Remove the item from the array
                          setProductArray(updatedProductArray);
                        }}
                      >
                        <Delete />
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </>
            {/* <div className="grid-2">
              <div className="input-container">
                <CustomSelectButton
                  name="shipping"
                  value={values.shipping}
                  onChange={handleChange}
                  err={errors.shipping && touched.shipping}
                  label={"Shipping"}
                >
                  <option value="" disabled selected hidden>
                    Choose a shipping carrier
                  </option>
                  {SHIPPING.map((option) => (
                    <>
                      <option
                        key={option.id}
                        value={option.name}
                        className="py-4 text-md hover:bg-lightPrimary"
                      >
                        {option.name}
                      </option>
                    </>
                  ))}
                </CustomSelectButton>
              </div>
              <div className="input-container">
                <InputIcons
                  inputName={"price"}
                  placeholder={"price"}
                  value={values.price}
                  onChange={handleChange}
                  type={"number"}
                  err={errors.price && touched.price}
                  iconRight={<Edit />}
                />
              </div>
            </div> */}
            <div className="btn-container">
              <Buttons
                type="submit"
                color="primary"
                onClick={() => submitForm()}
              >
                Submit
              </Buttons>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateOrderForm;

// quantity: "",
// unit: "",

//             <div className="btn-container">
//               <Buttons
//                 type={"submit"}
//                 color={"primary"}
//                 onClick={() => submitForm()}
//               >
//                 Submit
//               </Buttons>
//             </div>
// <div className="input-container">
//                 <InputIcons
//                   inputName={`productName`}
//                   placeholder="product name"
//                   value={values.productName}
//                   onChange={handleChange}
//                   type="text"
//                   err={errors.productName && touched.productName}
//                   iconRight={<Edit />}
//                 />
