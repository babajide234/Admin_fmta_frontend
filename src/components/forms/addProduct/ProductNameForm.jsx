//eslint-disable-next-line no-unused-vars
import React from "react";
import DashHeader from "../../Dash/DashHeader";
import InputIcons, {
  CustomSelectButton,
  TextAreaIcon,
} from "../../common/InputIcons";
import { ReactComponent as Edit } from "../../../assets/main/icon/edit-2.svg";
import { size } from "../../../util/util";

import PropTypes from "prop-types";
import CatSelect from "../../cat-subcat/CatSelect";
import SubCatSelect from "../../cat-subcat/SubCatSelect";

const ProductNameForm = ({ values, touched, errors, handleChange }) => {
  return (
    <section>
      <DashHeader small={true} text={"Description"} />
      <div className="">
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

        <div className="input-container grid-2">
          <div className="">
            {/* <CustomSelectButton
              name="category"
              value={values.category}
              onChange={handleChange}
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
            </CustomSelectButton> */}
            <CatSelect
              values={values}
              touched={touched}
              errors={errors}
              handleChange={handleChange}
            />
          </div>

          <div className="">
            {/* <CustomSelectButton
              name="subCategory"
              value={values.subCategory}
              onChange={handleChange}
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
            </CustomSelectButton> */}
            <SubCatSelect
              values={values}
              touched={touched}
              errors={errors}
              handleChange={handleChange}
            />
          </div>
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
              value={values.size}
              onChange={handleChange}
              err={errors.size && touched.size}
              label={"Value"}
            >
              <option value="" selected hidden disabled>
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
              value={values.currency}
              onChange={handleChange}
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
        <div className="input-container">
          <TextAreaIcon
            inputName={"description"}
            value={values.description}
            placeholder={"Product Description"}
            onChange={handleChange}
            err={errors.description && touched.description}
            iconRight={<Edit />}
          />
        </div>
        <div className="input-container">
          <InputIcons
            inputName={"videoLink"}
            type={"text"}
            placeholder={"Video Link"}
            iconRight={<Edit />}
            value={values.videoLink}
            err={errors.videoLink && touched.videoLink}
            onChange={handleChange}
          />
        </div>
      </div>
    </section>
  );
};

ProductNameForm.propTypes = {
  errors: PropTypes.any,
  values: PropTypes.any,
  touched: PropTypes.any,
  handleChange: PropTypes.any,
};

export default ProductNameForm;
