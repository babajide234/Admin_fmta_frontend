//eslint-disable-next-line no-unused-vars
import React from "react";
import DashHeader from "../../Dash/DashHeader";
import InputIcons, { TextAreaIcon } from "../../common/InputIcons";
import { ReactComponent as Edit } from "../../../assets/main/icon/edit-2.svg";
import PropTypes from "prop-types";

const OtherDetailsForm = ({ values, touched, errors, handleChange }) => {
  return (
    <section className="otherDetailForm">
      <DashHeader text={"Add more specification"} small={true} />
      <div className="input-container ">
        <InputIcons
          inputName={"madeIn"}
          type={"text"}
          placeholder={"Made In"}
          iconRight={<Edit />}
          value={values.madeIn}
          err={errors.madeIn && touched.madeIn}
          onChange={handleChange}
        />
      </div>
      <div className="input-container grid-2">
        <div className=" ">
          <InputIcons
            inputName={"manufacturedDate"}
            type={"date"}
            placeholder={"Manufactured Date"}
            // iconRight={<Edit />}
            value={values.manufacturedDate}
            err={errors.manufacturedDate && touched.manufacturedDate}
            onChange={handleChange}
          />
        </div>
        <div className="">
          <InputIcons
            inputName={"expiryDate"}
            type={"date"}
            placeholder={"Expiry Date"}
            // iconRight={<Edit />}
            value={values.expiryDate}
            err={errors.expiryDate && touched.expiryDate}
            onChange={handleChange}
          />
        </div>
      </div>
      {/* <div className="input-container grid-2">
          <div className="">
            <DatePickerField
              inputName={"manufacturedDate"}
              placeholder={"manufactured Date"}
              value={values.manufacturedDate}
              err={errors.manufacturedDate && touched.manufacturedDate}
              onChange={handleChange}
            />
          </div>

          <div className="">
            <DatePickerField
              inputName={"expiryDate"}
              placeholder={"expiry Date"}
              value={values.expiryDate}
              err={errors.expiryDate && touched.expiryDate}
              onChange={handleChange}
            />
          </div>
        </div> */}

      <div className="input-container">
        <TextAreaIcon
          inputName={"inTheBox"}
          placeholder={"What's in the box"}
          value={values.inTheBox}
          err={errors.inTheBox && touched.inTheBox}
          onChange={handleChange}
          iconRight={<Edit />}
        />
      </div>
    </section>
  );
};

OtherDetailsForm.propTypes = {
  errors: PropTypes.any,
  values: PropTypes.any,
  touched: PropTypes.any,
  handleChange: PropTypes.any,
};

export default OtherDetailsForm;
