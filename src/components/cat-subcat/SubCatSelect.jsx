// eslint-disable-next-line no-unused-vars
import React from "react";
import productSlice from "../../store/productStore";
import { CustomSelectButton } from "../common/InputIcons";
import PropTypes from "prop-types";

const SubCatSelect = ({ values, errors, touched, handleChange }) => {
  const subCategoryData = productSlice.getState().subCategory;
  return (
    <>
      <CustomSelectButton
        name={"subCategory"}
        values={values.subCategory}
        onchange={handleChange}
        label={"Sub-category"}
        err={errors.subCategory && touched.subCategory}
      >
        <option
          value=""
          disabled
          selected
          hidden
          className="secondary-disabled"
        >
          Select a sub-category
        </option>
        {subCategoryData?.map((option) => (
          <option
            key={option.id}
            value={option.id}
            className="py-4 text-md hover:bg-lightPrimary"
          >
            {option.name}
          </option>
        ))}
      </CustomSelectButton>
    </>
  );
};
SubCatSelect.propTypes = {
  errors: PropTypes.any,
  values: PropTypes.any,
  touched: PropTypes.any,
  handleChange: PropTypes.any,
};
export default SubCatSelect;
