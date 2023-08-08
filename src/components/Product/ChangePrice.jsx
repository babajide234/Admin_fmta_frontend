// eslint-disable-next-line no-unused-vars
import React from "react";
import productSlice from "../../store/productStore";
import DashHeader from "../Dash/DashHeader";
import { Formik } from "formik";
import InputIcons, { CustomSelectButton } from "../common/InputIcons";
import { Buttons } from "../buttons/Buttons";
import * as Yup from "yup";
import { ReactComponent as Edit } from "../../assets/main/icon/edit-2.svg";
import { Coins } from "lucide-react";
import PropTypes from "prop-types";

const ChangePrice = ({ close }) => {
  const product = productSlice((state) => state.product);
  const intiialValues = {
    oldPrice: product?.price ?? "",
    newPrice: "",
    currency: product?.currency ?? "",
  };

  const PriceSchema = Yup.object().shape({
    oldPrice: Yup.string().required(),
    newPrice: Yup.string().required(),
    currency: Yup.string().required(),
  });

  const onSubmit = (values, { setSubmitting }) => {
    console.log(values);
    setSubmitting(false);
    close();
  };

  return (
    <div>
      <DashHeader text={"Change price"} subText={product?.name ?? ""} />
      <div className="py-4">
        <Formik
          initialValues={intiialValues}
          validationSchema={PriceSchema}
          onSubmit={onSubmit}
          enableReinitialize={true}
        >
          {({ values, errors, touched, handleChange, submitForm }) => (
            <form>
              <div className="input-container">
                <InputIcons
                  inputName={"oldPrice"}
                  type={"text"}
                  iconRight={<Edit />}
                  iconLeft={<Coins />}
                  placeholder={"Old price"}
                  value={values.oldPrice}
                  onChange={handleChange}
                  err={errors.oldPrice && touched.oldPrice}
                  disabled
                />
              </div>
              <div className="input-container">
                <InputIcons
                  inputName={"newPrice"}
                  type={"text"}
                  iconRight={<Edit />}
                  iconLeft={<Coins />}
                  placeholder={"New price"}
                  value={values.newPrice}
                  onChange={handleChange}
                  err={errors.newPrice && touched.newPrice}
                />
              </div>
              <div className="input-container">
                <CustomSelectButton
                  name={"currency"}
                  label="currency"
                  value={values.currency}
                  onChange={handleChange}
                  err={errors.currency && touched.currency}
                  defaultValue={"option1"}
                >
                  <option value="option1"  disabled>
                    Select currency
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
              <div className="btn_container">
                <div className="w-full">
                  <Buttons
                    type={"submit"}
                    color={"primary"}
                    onClick={(e) => {
                      e.preventDefault();
                      submitForm();
                    }}
                    disable={
                      errors.currency ||
                      values.currency === "" ||
                      errors.newPrice ||
                      values.newPrice === ""
                    }
                  >
                    Submit
                  </Buttons>
                </div>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

ChangePrice.propTypes = {
  close: PropTypes.func,
};
export default ChangePrice;
