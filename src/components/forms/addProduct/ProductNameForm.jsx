//eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import DashHeader from "../../Dash/DashHeader";
import InputIcons, { CustomSelectButton } from "../../common/InputIcons";
import { ReactComponent as Edit } from "../../../assets/main/icon/edit-2.svg";
import { UNITS, USERROLE } from "../../../util/util";

import PropTypes from "prop-types";
import CatSelect from "../../cat-subcat/CatSelect";
import SubCatSelect from "../../cat-subcat/SubCatSelect";
import roleSlice from "../../../store/roleSlice";
import { useQuery } from "react-query";
import { Field } from "formik";
import ImagePicker from "../../ImagePicker/index";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import productSlice from "../../../store/productStore";

const ProductNameForm = ({
  values,
  touched,
  errors,
  handleChange,
  edit,
  imgArray,
  setImgArray,
  setFieldValue,
  editProdImg,
}) => {
  const [role, setRole] = useState("");
  const [isChecked, setChecked] = useState(false);
  const [catId, setCatId] = useState("")
  const getUsersByRole = roleSlice.getState().getUsersByRole;

  //zust state for categegory
  const getCategoryName = productSlice((state) => state.getCategoryName)
  const getSubCategory = productSlice(state => state.getSubCategory)



  const { data, isLoading } = useQuery(
    ["getUsersByRole", role],
    () => getUsersByRole(role),
    {
      enabled: role !== "",
    }
  );

  const handleCheckbox = (e) => {
    setChecked(e.target.checked);
  };

  const handleImageChange = (url) => {
    if (imgArray.length <= 3) {
      setImgArray((Prev) => [...Prev, url]);
    } else {
      return;
    }
  };

  const { data: catData = [], isLoading: CategoryLoading } = useQuery(
    "getCategoryName",
    async () => {
      const response = await getCategoryName();
      return response;
    }
  );

  const { data: subCatData = [], isLoading: subCatLoading } = useQuery(
    ["getSub", catId],
    async () => {
      const response = await getSubCategory(catId);
      return response.data;
    }, {
    enabled: catId !== ''
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
          {/* <div className="">
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
          </div> */}
          <div className="">
            <CustomSelectButton
              name={"category"}
              value={values.category}
              onChange={(e) => {
                handleChange(e)
                setCatId(e.target.value)
              }}
              label={"Product category"}
              loading={CategoryLoading}
              err={errors.category && touched.category}
            >
              <option
                value=""
                disabled
                selected
                hidden
              >
                Select a category
              </option>
              {catData && catData?.map((option, index) => (
                <option key={index} value={option.id} className="">
                  {option.name}
                </option>
              ))}
            </CustomSelectButton>
          </div>
          <div>
            <CustomSelectButton
              name={"subCategory"}
              value={values.subCategory}
              onChange={handleChange}
              label={"Subcategory"}
              loading={subCatLoading}
              err={errors.subCategory && touched.subCategory} >
              <option
                disabled
                selected
                hidden
              >
                Select a sub-category
              </option>
              {subCatData && subCatData?.map((option) => (
                <option
                  key={option.id}
                  value={option.id}
                  className="py-4 text-md hover:bg-lightPrimary"
                >
                  {option.name}
                </option>
              ))}
            </CustomSelectButton>
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
              defaultValue={"option1"}
            >
              <option value="option1" disabled>
                Size
              </option>
              {UNITS.map((option, index) => (
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
        </div>

        <div className="input-container grid-2">
          <div>
            <InputIcons
              inputName={"price"}
              type={"text"}
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
          {/* <TextAreaIcon
            inputName={"description"}
            value={values.description}
            placeholder={"Product Description"}
            onChange={handleChange}
            err={errors.description && touched.description}
            iconRight={<Edit />}
          /> */}
          {errors.description && touched.description && (
            <div className="error">***</div>
          )}
          <ReactQuill
            name="description"
            placeholder="Product Description (required)"
            value={values.description}
            onChange={(content) => setFieldValue("description", content)}
            style={{
              height: "180px",
              // border: touched.inTheBox && errors.inTheBox ? "1px solid red" : "",
            }}
          />
        </div>

        <div className="input-container mt-11">
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

        <div className="input-container flex items-center gap-4 align-middle">
          <Field
            type="checkbox"
            name="imageCheckBox"
            id="imageCheckBox"
            checked={isChecked}
            onClick={handleCheckbox}
          />
          <label htmlFor="imageCheckBox" className="p4 secondary">
            {edit ? "Edit" : "Add"} product images (optional)
          </label>
        </div>

        {isChecked && (
          // <section className="flex gap-4 items-center flex-wrap">
          //   <ImagePicker
          //     onChange={(imageData) => handleImageChange(imageData)}
          //     edit={edit}
          //     editImage={
          //       typeof editProdImg === "string"
          //         ? editProdImg
          //         : editProdImg?.[0] ?? null
          //     }
          //   />
          //   <ImagePicker
          //     onChange={(imageData) => handleImageChange(imageData)}
          //     edit={edit}
          //     editImage={
          //       typeof editProdImg === "string"
          //         ? editProdImg
          //         : editProdImg?.[1] ?? null
          //     }
          //   />
          //   <ImagePicker
          //     onChange={(imageData) => handleImageChange(imageData)}
          //     edit={edit}
          //     editImage={
          //       typeof editProdImg === "string"
          //         ? editProdImg
          //         : editProdImg?.[2] ?? null
          //     }
          //   />
          // </section>

          //mapped add imagePicker or edit imagePicker
          <section className="flex gap-4 items-center flex-wrap">
            {[0, 1, 2].map((index) => (
              <ImagePicker
                key={index}
                onChange={(imageData) => handleImageChange(imageData)}
                edit={edit}
                editImage={
                  typeof editProdImg === "string"
                    ? editProdImg
                    : editProdImg?.[index] ?? null
                }
              />
            ))}
          </section>
        )}
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
  imgArray: PropTypes.array,
  setImgArray: PropTypes.func,
  setFieldValue: PropTypes.func,
  editProdImg: PropTypes.any,
};

export default ProductNameForm;
