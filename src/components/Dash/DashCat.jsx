// eslint-disable-next-line no-unused-vars
import React from "react";
import DashHeader from "./DashHeader";
import PropTypes from "prop-types";
import Actions from "../common/Actions";
import { DropdownMenuItem } from "../../ui/dropdown-menu";
import LoadingSpinnerComponent from "react-spinners-components";
import { Buttons } from "../buttons/Buttons";
import DialogContainer from "../Modal/Dialog";
import { Field, Form, Formik } from "formik";
import InputIcons from "../common/InputIcons";
import { ReactComponent as Edit } from "../../assets/main/icon/edit-2.svg";
import { DialogFooter } from "../../ui/dialog";

const DashCat = ({
  variant = "outline",
  catLoading,
  catData,
  handleCategoryChange,
}) => {
  const initialValues = {
    category: "",
  };
  const onSubmit = (values, { setSubmitting }) => {
    console.log(values);
    setSubmitting(false);
  };
  return (
    <div className="dashCat">
      <div className="flex justify-between items-center gap-4">
        <DashHeader text={"Categories"} small={true} variant={variant} />
        <DialogContainer
          trigger={
            <div className="btn-container w-full">
              <Buttons color={"primary"} type={"btn"}>
                Add
              </Buttons>
            </div>
          }
          title={"Add category"}
        >
          <Formik initialValues={initialValues} onSubmit={onSubmit}>
            {({ values, errors, touched, handleChange, submitForm }) => (
              <Form>
                <div className="input-container">
                  <InputIcons
                    type={"text"}
                    inputName="category"
                    placeholder={"Category Name"}
                    onChange={handleChange}
                    value={values.category}
                    err={errors.category && touched.category}
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
      <div className="dashCat__div-body">
        <header className="dashCat__div-header grid grid-cols-7 py-2">
          <div className="p4 col-span-1 text-left pl-1">No.</div>
          <div className="p4 col-span-5 text-left">Name</div>
          <div className="p4 col-span-1"></div>
        </header>
        {catLoading ? (
          <LoadingSpinnerComponent
            type={"DualBall"}
            colors={["#001973", "#122122", "#19b8ed"]}
            size={"100px"}
          />
        ) : (
          <div className="dashCat__div-table">
            {catData?.map((row, index) => (
              <div
                className="dashCat__div-table-item grid grid-cols-7 py-2"
                key={row.id}
              >
                <div className="p4 col-span-1 text-left pl-1">{index + 1}</div>
                <div className="p4 col-span-5 text-left">{row.name}</div>
                <div className="p4 col-span-1">
                  <Actions>
                    <DropdownMenuItem className="dropdown-options p4 secondary ">
                      Edit
                    </DropdownMenuItem>

                    <DropdownMenuItem className="dropdown-options p4 secondary ">
                      Delete
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="dropdown-options p4 secondary"
                      id={row.id}
                      onClick={() => {
                        handleCategoryChange(row.id);
                      }}
                    >
                      SubCategory
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
DashCat.propTypes = {
  variant: PropTypes.oneOf(["outline", "fill", "empty"]),
  catData: PropTypes.any,
  catLoading: PropTypes.bool,
  handleCategoryChange: PropTypes.any,
};
export default DashCat;

export const EditCategory = ({ row }) => {
  const initialValues = {
    category: row.name,
    categoryId: row.id,
  };
  const onSubmit = (values, { setSubmitting }) => {
    console.log(values);
    setSubmitting(false);
  };
  return (
    <DialogContainer
      trigger={
        <DropdownMenuItem className="dropdown-options p4 secondary ">
          Edit
        </DropdownMenuItem>
      }
      title={"Edit Category"}
    >
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ values, errors, touched, handleChange, submitForm }) => (
          <Form>
            <div className="input-container">
              <InputIcons
                type={"text"}
                inputName="category"
                placeholder={"Category Name"}
                onChange={handleChange}
                value={values.category}
                err={errors.category && touched.category}
                iconRight={<Edit />}
              />
            </div>
            <Field
              name="categoryId"
              value={values.categoryId}
              type="hidden"
              onChange={handleChange}
            />
            <DialogFooter>
              <Buttons color={"primary"} type={"btn"} onClick={submitForm}>
                Submit
              </Buttons>
            </DialogFooter>
          </Form>
        )}
      </Formik>
    </DialogContainer>
  );
};

EditCategory.propTypes = {
  row: PropTypes.any,
};
