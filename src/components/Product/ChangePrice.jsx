// eslint-disable-next-line no-unused-vars
import React from "react";
import productSlice from "../../store/productStore";
import DashHeader from "../Dash/DashHeader";
import { Formik } from "formik";
import InputIcons, { CustomSelectButton } from "../common/InputIcons";
import { Buttons } from "../buttons/Buttons";
import * as Yup from "yup";
import { ReactComponent as Edit } from "../../assets/main/icon/edit-2.svg";
import PropTypes from "prop-types";
import { useMutation } from "react-query";
import { CurrencyDollar, CurrencyNgn } from "phosphor-react";

const ChangePrice = ({ close, success, failed, setSuccess, setFailed }) => {
  const product = productSlice((state) => state.product);
  const changePrice = productSlice((state) => state.changePrice);
  const intiialValues = {
    oldPrice: product?.price.original_price ?? "",
    newPrice: "",
    currency: product?.currency ?? "NGN",
  };

  const PriceSchema = Yup.object().shape({
    oldPrice: Yup.string().required(),
    newPrice: Yup.string().required(),
    currency: Yup.string().required(),
  });

  const priceMutation = useMutation(
    (formData) => changePrice(product?.id, formData),
    {
      onSuccess: (data) => {
        if (data?.status) {
          setSuccess(!success);
        } else {
          setFailed(!failed);
        }
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );
  const onSubmit = (values, { setSubmitting }) => {
    const formData = {
      price: values.newPrice,
      currency: values.currency,
    };
    priceMutation.mutate(formData);
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
                  iconLeft={
                    product?.currency == "NGN" ? (
                      <CurrencyNgn />
                    ) : (
                      <CurrencyDollar />
                    )
                  }
                  placeholder={"Old price"}
                  value={values.oldPrice}
                  onChange={handleChange}
                  err={errors.oldPrice && touched.oldPrice}
                  disable={true}
                />
              </div>
              <div className="input-container">
                <InputIcons
                  inputName={"newPrice"}
                  type={"text"}
                  iconRight={<Edit />}
                  iconLeft={
                    product?.currency == "NGN" ? (
                      <CurrencyNgn />
                    ) : (
                      <CurrencyDollar />
                    )
                  }
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
                  //   disable={true}
                >
                  <option value="option1" disabled hidden>
                    Select currency
                  </option>
                  {/* <option
                    value={"USD"}
                    className="py-4 text-md hover:bg-lightPrimary"
                  >
                    USD
                  </option> */}
                  <option
                    value={product?.currency}
                    className="py-4 text-md hover:bg-lightPrimary "
                    selected
                  >
                    {product?.currency}
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
  success: PropTypes.bool,
  failed: PropTypes.bool,
  setSuccess: PropTypes.func,
  setFailed: PropTypes.func,
};
export default ChangePrice;
