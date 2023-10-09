/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { CustomSelectButton } from "../common/InputIcons";
import productSlice from "../../store/productStore";
import { useQuery } from "react-query";
import PropTypes from "prop-types";

const CatSelect = ({ errors, values, touched, handleChange }) => {
  const [catId, setCatId] = useState("");
  const getCategoryName = productSlice.getState().getCategoryName;
  const getSubCategory = productSlice.getState().getSubCategory;

  const { data, isLoading: CategoryLoading } = useQuery(
    "getCategoryName",
    async () => {
      const response = await getCategoryName();
      return response;
    }
  );

  const handleCategoryChange = (event) => {
    const id = event.target.value;
    console.log(id);
    setCatId(id);
    getSubCategory(id);
  };

  //   const { data: subCatData, isLoading: subCatLoading } = useQuery(
  //     ["subcat", catId],
  //     async () => {
  //       const response = await getSubCategory(catId);
  //       console.log(response.data);

  //       return response.data;
  //     }
  //   );

  return (
    <>
      <CustomSelectButton
        name={"category"}
        value={values.category}
        onChange={(event) => {
          handleChange(event);
          handleCategoryChange(event);
        }}
        label="Product Category"
        loading={CategoryLoading}
        err={errors.category && touched.category}
      >
        <option
          value=""
          disabled
          selected
          hidden
          className="secondary-disabled"
        >
          Select a category
        </option>
        {data?.map((option, index) => (
          <option key={index} value={option.id} className="">
            {option.name}
          </option>
        ))}
      </CustomSelectButton>
    </>
  );
};
CatSelect.propTypes = {
  errors: PropTypes.any,
  values: PropTypes.any,
  touched: PropTypes.any,
  handleChange: PropTypes.any,
};
export default CatSelect;
