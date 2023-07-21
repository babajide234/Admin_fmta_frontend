//eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import DashHeader from "../../Dash/DashHeader";
import InputIcons, {
  CustomSelectButton,
  TextAreaIcon,
} from "../../common/InputIcons";
import { ReactComponent as Edit } from "../../../assets/main/icon/edit-2.svg";
import { UNITS, USERROLE } from "../../../util/util";

import PropTypes from "prop-types";
import CatSelect from "../../cat-subcat/CatSelect";
import SubCatSelect from "../../cat-subcat/SubCatSelect";
import roleSlice from "../../../store/roleSlice";
import { useQuery } from "react-query";

const ProductNameForm = ({ values, touched, errors, handleChange, edit }) => {
  const [role, setRole] = useState("");
  const getUsersByRole = roleSlice.getState().getUsersByRole;

  const { data, isLoading } = useQuery(
    ["getUsersByRole", role],
    () => getUsersByRole(role),
    {
      enabled: role !== "",
    }
  );

  return (
    <section>
      <DashHeader small={true} text={"Description"} />
      <div className="">
        {!edit && (
          <div className="input-container grid-2">
            <div className="">
              <CustomSelectButton
                name="userRole"
                value={values.userRole}
                onChange={(e) => {
                  handleChange(e);
                  setRole(e.target.value);
                }}
                err={errors.userRole && touched.userRole}
                label={"Role"}
              >
                <option
                  value=""
                  disabled
                  selected
                  className="secondary-disabled"
                >
                  Select role
                </option>
                {USERROLE.map((option, index) => (
                  <option
                    key={index}
                    value={option.name}
                    className="py-4 text-md hover:bg-lightPrimary capitalize"
                  >
                    {option.name}
                  </option>
                ))}
              </CustomSelectButton>
            </div>

            <div className="">
              <CustomSelectButton
                name="userId"
                value={values.userId}
                onChange={handleChange}
                err={errors.userId && touched.userId}
                label={"owned by"}
                loading={isLoading}
              >
                <option
                  value=""
                  disabled
                  selected
                  className="secondary-disabled"
                >
                  Select a name
                </option>
                {data &&
                  data?.map((option, index) => (
                    <option
                      key={index}
                      value={option.id}
                      className="py-4 text-md hover:bg-lightPrimary capitalize"
                    >
                      {option.name}
                    </option>
                  ))}
              </CustomSelectButton>
            </div>
          </div>
        )}
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
            <CatSelect
              values={values}
              touched={touched}
              errors={errors}
              handleChange={handleChange}
            />
          </div>

          <div className="">
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
              <option value="" selected disabled>
                Size
              </option>
              {UNITS.map((option) => (
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
          <CustomSelectButton
            name="condition"
            value={values.condition}
            onChange={handleChange}
            err={errors.condition && touched.condition}
            label={"condition"}
          >
            <option value="" selected hidden disabled>
              Condition of product
            </option>

            <option
              value={"New"}
              className="py-4 text-md hover:bg-lightPrimary"
            >
              new
            </option>
            <option
              value={"refurbished"}
              className="py-4 text-md hover:bg-lightPrimary"
            >
              refurbished
            </option>
          </CustomSelectButton>
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
  edit: PropTypes.bool,
};

export default ProductNameForm;
