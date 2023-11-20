// eslint-disable-next-line no-unused-vars
import React from "react";
import DashHeader from "../components/Dash/DashHeader";
import BorderContainer from "../components/common/BorderContainer";
import { MARKUPLIST, adminRoles } from "../util/util";
import Actions from "../components/common/Actions";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import DialogContainer from "../components/Modal/Dialog";
import { Buttons } from "../components/buttons/Buttons";
import { Form, Formik } from "formik";
import InputIcons from "../components/common/InputIcons";
import { ReactComponent as Edit } from "../assets/main/icon/edit-2.svg";
import { DialogFooter } from "../ui/dialog";
import userSlice from "../store/userStore";

const Markup = () => {
  const role = userSlice.getState().role
  const initialValues = {
    markup: "",
  };
  const onSubmit = (values, { setSubmitting }) => {
    console.log(values);
    setSubmitting(false);
  };
  return (
    <main className="dashMarkup">
      <div className="dashMarkup-container">
        <DashHeader text={"Markup"} variant="outline" />
        <div className="dashMarkup__div-body">
          <div className="dashMarkup__div-content">
            <BorderContainer variant="outline" width={"60%"}>
              <DashHeader
                text={"Markup List"}
                small={true}
                variant={"outline"}
              />
              <header className="dashMarkup__div-header grid grid-cols-3 py-2">
                <div className="p4 col-span-1 text-left">Type</div>
                <div className="p4 col-span-1 text-left">Value</div>
                <div className="p4 col-span-1"></div>
              </header>
              <div className="dashMarkup__div-table">
                {MARKUPLIST.map((row, index) => (
                  <div
                    className="dashMarkup__div-table-item grid grid-cols-3 py-2"
                    key={index}
                  >
                    <div className="p4 col-span-1 text-left capitalize">
                      {row.name}
                    </div>
                    <div className="p4 col-span-1 text-left">{row.value}</div>
                    {adminRoles.includes(role) && <div className="p4 col-span-1 text-left">
                      <Actions>
                        <DropdownMenuItem className="dropdown-options p4 secondary px-2 ">
                          Edit
                        </DropdownMenuItem>
                      </Actions>
                    </div>}
                  </div>
                ))}
              </div>
              {adminRoles.includes(role) && <div className="dashMarkup__div-btn flex items-center justify-between gap-4">
                <DialogContainer
                  trigger={
                    <div className="btn-container">
                      <Buttons color={"primary"} type={"btn"}>
                        Add Markup
                      </Buttons>
                    </div>
                  }
                  title={"Default Modal"}
                >
                  <Formik initialValues={initialValues} onSubmit={onSubmit}>
                    {({
                      values,
                      errors,
                      touched,
                      handleChange,
                      submitForm,
                    }) => (
                      <Form>
                        <div className="input-container">
                          <InputIcons
                            type={"text"}
                            inputName="markup"
                            placeholder={"Markup Name"}
                            onChange={handleChange}
                            value={values.markup && touched.markup}
                            err={errors.markup && touched.markup}
                            iconRight={<Edit />}
                          />
                        </div>
                        <DialogFooter>
                          <Buttons
                            color={"primary"}
                            type={"btn"}
                            onClick={submitForm}
                          >
                            Submit
                          </Buttons>
                        </DialogFooter>
                      </Form>
                    )}
                  </Formik>
                </DialogContainer>
                <CreateMarkup />
              </div>}
            </BorderContainer>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Markup;

export const CreateMarkup = () => {
  const initialValues = {
    createMarkup: "",
  };
  const onSubmit = (values, { setSubmitting }) => {
    console.log(values);
    setSubmitting(false);
  };
  return (
    <DialogContainer
      trigger={
        <div className="btn-container">
          <Buttons color={"primary"} type={"btn"}>
            Create Markup
          </Buttons>
        </div>
      }
      title={"Default Modal"}
    >
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ values, errors, touched, handleChange, submitForm }) => (
          <Form>
            <div className="input-container">
              <InputIcons
                type={"text"}
                inputName="createMarkup"
                placeholder={"Create Markup"}
                onChange={handleChange}
                value={values.createMarkup && touched.createMarkup}
                err={errors.createMarkup && touched.createMarkup}
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
  );
};
