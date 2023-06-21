// eslint-disable-next-line no-unused-vars
import React from "react";
import DashHeader from "./DashHeader";
import Actions from "../common/Actions";
import { DropdownMenuItem } from "../../ui/dropdown-menu";
import PropTypes from "prop-types";
import LoadingSpinnerComponent from "react-spinners-components";
import { Buttons } from "../buttons/Buttons";
import { Form, Formik } from "formik";
import InputIcons from "../common/InputIcons";
import { DialogFooter } from "../../ui/dialog";
import { ReactComponent as Edit } from "../../assets/main/icon/edit-2.svg";
import DialogContainer from "../Modal/Dialog";
import CatSelect from "../cat-subcat/CatSelect";

const DashSubCat = ({
  variant = "outline",
  subCategoryData,
  subCatLoading,
}) => {
  const initialValues = {
    category: "",
    subCategory: "",
  };
  const onSubmit = (values, { setSubmitting }) => {
    console.log(values);
    setSubmitting(false);
  };
  return (
    <div className="dashSubCat">
      <div className="flex justify-between items-center gap-2">
        <DashHeader small={true} text={"Sub-Categories"} variant={variant} />
        <DialogContainer
          trigger={
            <div className="btn-container">
              <Buttons color={"primary"} type={"btn"}>
                Add Sub-category
              </Buttons>
            </div>
          }
          title={"Default Modal"}
        >
          <Formik initialValues={initialValues} onSubmit={onSubmit}>
            {({ values, errors, touched, handleChange, submitForm }) => (
              <Form>
                <div className="input-container">
                  <CatSelect
                    values={values}
                    touched={touched}
                    errors={errors}
                    handleChange={handleChange}
                  />
                </div>
                <div className="input-container">
                  <InputIcons
                    type={"text"}
                    inputName="subCategory"
                    placeholder={"Sub-Category Name"}
                    onChange={handleChange}
                    value={values.subCategory && touched.subCategory}
                    err={errors.subCategory && touched.subCategory}
                    iconRight={<Edit />}
                  />
                </div>
                <DialogFooter>
                  <Buttons color={"primary"} type={"btn"} onClick={submitForm}>
                    Submit
                  </Buttons>
                </DialogFooter>
              </Form>
            )}
          </Formik>
        </DialogContainer>
      </div>
      <div className="dashSubCat__div-body">
        <header className="dashSubCat__div-header grid grid-cols-7 py-2">
          <div className="p4 col-span-1 text-left">No.</div>
          <div className="p4 col-span-5 text-left">Name</div>
          <div className="p4 col-span-1"></div>
        </header>
        {subCategoryData === null || subCategoryData === [] || subCatLoading ? (
          <LoadingSpinnerComponent
            type={"DualBall"}
            colors={["#001973", "#122122", "#19b8ed"]}
            size={"100px"}
          />
        ) : (
          <div className="dashSubCat__div-table">
            {subCategoryData?.map((row, index) => (
              <div
                className="dashSubCat__div-table-item grid grid-cols-7 py-2"
                key={row.id}
              >
                <div className="p4 col-span-1 text-left">{index + 1}</div>
                <div className="p4 col-span-5 text-left">{row.name}</div>
                <div className="p4 col-span-1">
                  <Actions>
                    <DropdownMenuItem className="dropdown-options p4 secondary ">
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem className="dropdown-options p4 secondary ">
                      Delete
                    </DropdownMenuItem>
                  </Actions>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
DashSubCat.propTypes = {
  variant: PropTypes.oneOf(["outline", "fill", "empty"]),
  subCategoryData: PropTypes.any,
  subCatLoading: PropTypes.any,
};
export default DashSubCat;
