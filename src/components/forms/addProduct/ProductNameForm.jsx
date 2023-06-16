//eslint-disable-next-line no-unused-vars
import React from "react";
import DashHeader from "../../Dash/DashHeader";
import { Formik, Form } from "formik";
import InputIcons, { CustomSelectButton } from "../../common/InputIcons";
import { ReactComponent as Edit } from "../../../assets/main/icon/edit-2.svg";
import { size } from "../../../util/util";

const ProductNameForm = () => {
  const initialValues = {
    name: "",
    moq: "",
    size: "",
    category: "",
    subCategory: "",
    brand: "",
    price: "",
    currency: "",
    discount: "",
  };

  return (
    <div>
      <DashHeader text={"Name, price and quantity"} small={true} />
      <Formik initialValues={initialValues}>
        {({ errors, values, handleChange, touched }) => (
          <Form>
            <div className="input-container">
              <InputIcons
                inputName={"name"}
                type={"text"}
                placeholder={"Product Name"}
                iconRight={<Edit />}
                value={values.name}
                err={errors.name && touched.name}
                onChange={handleChange}
              />
            </div>

            <div className="input-container">
              <CustomSelectButton
                name="category"
                values={values.category}
                onchange={handleChange}
                err={errors.category && touched.category}
                label={"Product Category"}
              >
                <option
                  value=""
                  disabled
                  selected
                  hidden
                  className="secondary-disabled"
                >
                  Product Category
                </option>
                {size.map((option) => (
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
              <CustomSelectButton
                name="subCategory"
                values={values.subCategory}
                onchange={handleChange}
                err={errors.subCategory && touched.subCategory}
                label={"Product Sub-Category"}
              >
                <option value="" disabled selected hidden>
                  Product Sub-Category
                </option>
                {size.map((option) => (
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
                inputName={"brand"}
                type={"text"}
                placeholder={"Product brand"}
                iconRight={<Edit />}
                value={values.brand}
                err={errors.brand && touched.brand}
                onChange={handleChange}
              />
            </div>

            <div className="input-container grid-2">
              <div>
                <InputIcons
                  inputName={"moq"}
                  type={"number"}
                  placeholder={"Minimum Order Quantity"}
                  iconRight={<Edit />}
                  value={values.moq}
                  err={errors.moq && touched.moq}
                  onChange={handleChange}
                />
              </div>
              <div>
                <CustomSelectButton
                  name="size"
                  values={values.size}
                  onchange={handleChange}
                  err={errors.size && touched.size}
                  label={"Value"}
                >
                  <option value="" selected>
                    Size
                  </option>
                  {size.map((option) => (
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
            </div>

            <div className="input-container grid-2">
              <div>
                <InputIcons
                  inputName={"price"}
                  type={"number"}
                  placeholder={"Product Price"}
                  iconRight={<Edit />}
                  value={values.price}
                  err={errors.price && touched.price}
                  onChange={handleChange}
                />
              </div>
              <div>
                <CustomSelectButton
                  name="currency"
                  values={values.currency}
                  onchange={handleChange}
                  err={errors.currency && touched.currency}
                  label={"Currency"}
                >
                  <option value="" selected hidden disabled>
                    Currency
                  </option>

                  <option
                    value={"USD"}
                    className="py-4 text-md hover:bg-lightPrimary"
                  >
                    USD
                  </option>
                  <option
                    value={"NGN"}
                    className="py-4 text-md hover:bg-lightPrimary"
                  >
                    NGN
                  </option>
                </CustomSelectButton>
              </div>
            </div>

            <div className="input-container">
              <InputIcons
                inputName={"discount"}
                type={"number"}
                placeholder={"Product discount"}
                iconRight={<Edit />}
                value={values.discount}
                err={errors.discount && touched.discount}
                onChange={handleChange}
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ProductNameForm;
