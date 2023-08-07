//eslint-disable-next-line no-unused-vars
import React from "react";
import DashHeader from "../../Dash/DashHeader";
import InputIcons, {
  CustomSelectButton,
  // TextAreaIcon,
} from "../../common/InputIcons";
// import { ReactComponent as Edit } from "../../../assets/main/icon/edit-2.svg";
import PropTypes from "prop-types";
import miscSlice from "../../../store/miscSlice";
import { useQuery } from "react-query";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const OtherDetailsForm = ({
  values,
  touched,
  errors,
  handleChange,
  setFieldValue,
}) => {
  const getCountry = miscSlice((state) => state.getCountry);

  const { data, isLoading } = useQuery("getCountries", () => getCountry());

  return (
    <section className="otherDetailForm">
      <DashHeader text={"Add more specification"} small={true} />
      <div className="input-container ">
        <CustomSelectButton
          name={"madeIn"}
          value={values.madeIn}
          label={"Made in"}
          err={errors.madeIn && touched.madeIn}
          onChange={handleChange}
          loading={isLoading}
        >
          <option value="option1" hidden>
            Made In
          </option>
          {data &&
            data?.map((option, index) => (
              <option
                key={index}
                value={option.name}
                className="py-4 text-md hover:bg-lightPrimary"
              >
                {option.name}
              </option>
            ))}
        </CustomSelectButton>
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

      <div className={`input-container `}>
        {touched.inTheBox && errors.inTheBox && <div className="error">***</div>}
        <ReactQuill
          name="inTheBox"
          placeholder="What's in the box (required)"
          value={values.inTheBox}
          onChange={(content) => setFieldValue("inTheBox", content)}
          style={{
            height: "120px",
            // border: touched.inTheBox && errors.inTheBox ? "1px solid red" : "",
          }}
        />
      </div>
    </section>
  );
};

OtherDetailsForm.propTypes = {
  errors: PropTypes.any,
  values: PropTypes.any,
  touched: PropTypes.any,
  handleChange: PropTypes.func,
  setFieldValue: PropTypes.func,
};

export default OtherDetailsForm;
