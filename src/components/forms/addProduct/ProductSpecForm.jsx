//eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import DashHeader from "../../Dash/DashHeader";
import InputIcons, { CustomSelectButton } from "../../common/InputIcons";
import { ReactComponent as Edit } from "../../../assets/main/icon/edit-2.svg";
import PropTypes from "prop-types";
import { useQuery } from "react-query";
import miscSlice from "../../../store/miscSlice";

const ProductSpecForm = ({ values, touched, errors, handleChange }) => {
  const [countryCode, setCountryCode] = useState("");
  const [stateCode, setStateCode] = useState("");
  const [imported, setImported] = useState("");

  const getCountry = miscSlice((state) => state.getCountry);
  const getState = miscSlice((state) => state.getState);
  const getCity = miscSlice((state) => state.getCity);

  const { data: countries, isLoading: countryLoading } = useQuery(
    "getCountry",
    () => {
      const response = getCountry();
      return response;
    }
  );
  const { data: states, isLoading: stateLoading } = useQuery(
    ["getStateQuery", countryCode],
    () => getState(countryCode),
    {
      enabled: countryCode !== "",
    }
  );
  const { data: cities, isLoading: cityLoading } = useQuery(
    ["getCityQuery", stateCode],
    () => getCity(stateCode),
    {
      enabled: stateCode !== "",
    }
  );

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
            onChange={(e) => {
              handleChange(e);
              setImported(e.target.value);
            }}
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

        {imported === "Yes" && (
          <>
            <div className="input-container">
              <CustomSelectButton
                name="country"
                value={values.country}
                onChange={(e) => {
                  handleChange(e);
                  setCountryCode(e.target.value);
                }}
                err={errors.country && touched.country}
                label={"Country"}
                loading={countryLoading}
              >
                <option
                  value=""
                  selected
                  disabled
                  className="py-4 text-md hover:bg-lightPrimary"
                >
                  Select country
                </option>
                {countries?.map((option, index) => {
                  <option
                    key={index}
                    value={option.isoCode}
                    className="py-4 text-md hover:bg-lightPrimary"
                  >
                    {option.name}
                  </option>;
                })}
              </CustomSelectButton>
            </div>
            <div className="input-container">
              <CustomSelectButton
                name="state"
                value={values.state}
                onChange={(e) => {
                  handleChange(e);
                  setStateCode(e.target.value);
                  // getCity(e.target.value);
                }}
                err={errors.state && touched.state}
                label={"state"}
                loading={stateLoading}
              >
                <option
                  value=""
                  selected
                  disabled
                  className="py-4 text-md hover:bg-lightPrimary"
                >
                  Select State
                </option>

                {states?.map((option, index) => (
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
                name="city"
                value={values.city}
                onChange={handleChange}
                err={errors.city && touched.city}
                label={"City"}
                loading={cityLoading}
              >
                <option
                  value=""
                  selected
                  disabled
                  className="py-4 text-md hover:bg-lightPrimary"
                >
                  Select city
                </option>
                {cities?.map((option, index) => (
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
          </>
        )}
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
