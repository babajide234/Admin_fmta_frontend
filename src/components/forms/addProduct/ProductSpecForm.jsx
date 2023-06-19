//eslint-disable-next-line no-unused-vars
import React from "react";
import DashHeader from "../../Dash/DashHeader";
import InputIcons, { CustomSelectButton } from "../../common/InputIcons";
import { ReactComponent as Edit } from "../../../assets/main/icon/edit-2.svg";
import PropTypes from "prop-types";

const ProductSpecForm = ({ values, touched, errors, handleChange }) => {
  return (
    <section className="productSpecForm">
      <div>
        <DashHeader small={true} text="Specification" />
        <div className="input-container grid-2">
          <div>
            <InputIcons
              inputName={"stockQuantity"}
              type={"text"}
              placeholder={"Quantity In Stock"}
              iconRight={<Edit />}
              value={values.stockQuantity}
              err={errors.stockQuantity && touched.stockQuantity}
              onChange={handleChange}
            />
          </div>
          <div>
            <CustomSelectButton
              name="stockSize"
              value={values.stockSize}
              onChange={handleChange}
              err={errors.stockSize && touched.stockSize}
              label="Value"
            >
              <option value="" selected>
                Sizes
              </option>
              {/* {size.map((option) => (
                    <>
                      <option
                        key={option.id}
                        value={option.name}
                        className="py-4 text-md hover:bg-lightPrimary"
                      >
                        {option.name}
                      </option>
                    </>
                  ))} */}
            </CustomSelectButton>
          </div>
        </div>

        <div className="input_container grid-3">
          <div>
            <InputIcons
              inputName={"length"}
              type={"text"}
              placeholder={"length"}
              iconRight={<Edit />}
              value={values.length}
              err={errors.length && touched.length}
              onChange={handleChange}
            />
          </div>
          <div>
            <InputIcons
              inputName={"width"}
              type={"text"}
              placeholder={"width"}
              iconRight={<Edit />}
              value={values.width}
              err={errors.width && touched.width}
              onChange={handleChange}
            />
          </div>
          <div>
            <InputIcons
              inputName={"height"}
              type={"text"}
              placeholder={"height"}
              iconRight={<Edit />}
              value={values.height}
              err={errors.height && touched.height}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="input-container">
          <CustomSelectButton
            name="adultOrChild"
            value={values.adultOrChild}
            onChange={handleChange}
            err={errors.adultOrChild && touched.adultOrChild}
            label={"Is this product for an adult or a child?"}
          >
            <option
              value=""
              disabled
              selected
              hidden
              className="py-4 text-md hover:bg-lightPrimary"
            >
              Adult or Children
            </option>
            <option
              value={"adult"}
              className="py-4 text-md hover:bg-lightPrimary"
            >
              Adult
            </option>
            <option
              value={"child"}
              className="py-4 text-md hover:bg-lightPrimary"
            >
              Child
            </option>
          </CustomSelectButton>
        </div>

        <div className="input-container">
          <InputIcons
            inputName={"productSize"}
            type={"text"}
            placeholder={"Product size (Enter sizes seperated by comma(,))"}
            iconRight={<Edit />}
            value={values.productSize}
            err={errors.productSize && touched.productSize}
            onChange={handleChange}
          />
        </div>

        <div className="input-container">
          <InputIcons
            inputName={"productWeight"}
            type={"number"}
            placeholder={"Product Weight (Kg)"}
            iconRight={<Edit />}
            value={values.productWeight}
            err={errors.productWeight && touched.productWeight}
            onChange={handleChange}
          />
        </div>

        <div className="input-container">
          <InputIcons
            inputName={"productColor"}
            type={"text"}
            placeholder={"Product Color"}
            iconRight={<Edit />}
            value={values.productColor}
            err={errors.productColor && touched.productColor}
            onChange={handleChange}
          />
        </div>

        <div className="input-container">
          <InputIcons
            inputName={"modelNum"}
            type={"text"}
            placeholder={"Product Model Number"}
            iconRight={<Edit />}
            value={values.modelNum}
            err={errors.modelNum && touched.modelNum}
            onChange={handleChange}
          />
        </div>
      </div>
      <div>
        <DashHeader small={true} text="Shipping" />
        <div className="input-container">
          <CustomSelectButton
            name="imported"
            value={values.imported}
            onChange={handleChange}
            err={errors.imported && touched.imported}
            label={"imported"}
          >
            <option value="" selected hidden disabled>
              Imported from Abroad
            </option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </CustomSelectButton>
        </div>

        <div className="input-container">
          <CustomSelectButton
            name="country"
            values={values.country}
            onChange={handleChange}
            err={errors.country && touched.country}
            label={"Country"}
          >
            <option
              value=""
              selected
              disabled
              hidden
              className="py-4 text-md hover:bg-lightPrimary"
            >
              Country
            </option>
            <option
              value={"adult"}
              className="py-4 text-md hover:bg-lightPrimary"
            >
              Adult
            </option>
            <option
              value={"child"}
              className="py-4 text-md hover:bg-lightPrimary"
            >
              Child
            </option>
          </CustomSelectButton>
        </div>

        <div className="input-container">
          <CustomSelectButton
            name="city"
            values={values.city}
            onChange={handleChange}
            err={errors.city && touched.city}
            label={"City"}
          >
            <option
              value=""
              selected
              disabled
              className="py-4 text-md hover:bg-lightPrimary"
            >
              City
            </option>
            <option
              value={"adult"}
              className="py-4 text-md hover:bg-lightPrimary"
            >
              Adult
            </option>
            <option
              value={"child"}
              className="py-4 text-md hover:bg-lightPrimary"
            >
              Child
            </option>
          </CustomSelectButton>
        </div>

        <div className="input-container">
          <InputIcons
            inputName={"postal"}
            type={"number"}
            placeholder={" Postal Code"}
            iconRight={<Edit />}
            value={values.postal}
            err={errors.postal && touched.postal}
            onChange={handleChange}
          />
        </div>

        <div className="input-container">
          <InputIcons
            inputName={"address"}
            type={"text"}
            placeholder={"address"}
            iconRight={<Edit />}
            value={values.address}
            err={errors.address && touched.address}
            onChange={handleChange}
          />
        </div>

        <div className="input-container">
          <InputIcons
            inputName={"hsc"}
            type={"text"}
            placeholder={"Customs HSC Code"}
            iconRight={<Edit />}
            value={values.hsc}
            err={errors.hsc && touched.hsc}
            onChange={handleChange}
          />
        </div>
      </div>
    </section>
  );
};

ProductSpecForm.propTypes = {
  errors: PropTypes.any,
  values: PropTypes.any,
  touched: PropTypes.any,
  handleChange: PropTypes.any,
};
export default ProductSpecForm;
