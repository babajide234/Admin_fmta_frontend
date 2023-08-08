// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import DashHeader from "../components/Dash/DashHeader";
import PropTypes from "prop-types";
import { Formik } from "formik";
import InputIcons, { TextAreaIcon } from "../components/common/InputIcons";
import { ReactComponent as Edit } from "../assets/main/icon/edit-2.svg";
import { ReactComponent as User } from "../assets/main/icon/user.svg";
import { EnvelopeSimple, Warning } from "phosphor-react";
import GoBack from "../components/GoBack";
import { Buttons } from "../components/buttons/Buttons";
import LinkTo from "../components/LinkTo";
import Modal from "../components/Modal/Modal";
import * as Yup from "yup";

const Org = () => {
  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [step, setStep] = useState(1);
  const deleteHandler = () => {
    setStep(1);
    setDeleteOpen(!deleteOpen);
  };
  const nextStep = () => {
    setStep(step + 1);
  };
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <DashboardDeleteAccount
            close={deleteHandler}
            nextStep={nextStep}
            header={"Leave organization?"}
            text={
              "You clicked on leave organization. This will remove you from your organization and revert your account to a normal account. To continue, please tell us why you'd want to leave your account."
            }
            btnLeft={"This was a mistake"}
            btnRight={"I want to leave"}
          />
        );
      case 2:
        return (
          <DashboardFinalDelete
            close={deleteHandler}
            text="Are you sure you want to leave your organization?"
            header={"This will reset your account!"}
            btnLeft={"No, this was a mistake"}
            btnRight={"Yes, leave "}
          />
        );
      default:
        return null;
    }
  };

  return (
    <main className="hospitalOrg">
      <GoBack to="/dashboard/account">Go back</GoBack>
      <DashHeader
        text={"Profile Settings"}
        subText={"Make changes to your profile"}
      />
      <section className="hospitalOrg-content">
        <ul className="hospitalOrg__div">
          <p className="hospitalOrg__p-header">Organization Information</p>

          <li className="hospitalOrg__div-common ">
            <p className="hospitalOrg__p-subhead">Organization Name</p>
            <p className="hospitalOrg__p-subtext">
              Jerry Itunu General Hospital
            </p>
          </li>

          <li className="hospitalOrg__div-common hospitalOrg__div-border">
            <p className="hospitalOrg__p-subhead">Organization Type</p>
            <p className="hospitalOrg__p-subtext">Hospital</p>
          </li>

          <li className="hospitalOrg__div-common hospitalOrg__div-border">
            <p className="hospitalOrg__p-subhead">Organization Contact Email</p>
            <p className="hospitalOrg__p-subtext">
              jerry.itunu013839@gmail.com
            </p>
          </li>

          <li className="hospitalOrg__div-common ">
            <p className="hospitalOrg__p-subhead ">
              Organization Contact Phone Number
            </p>
            <p className="hospitalOrg__p-subtext">08093232321</p>
          </li>
        </ul>

        <div className="hospitalOrg__div">
          <p className="hospitalOrg__p-header">Organization Members</p>

          <ul>
            <li className="hospitalOrg__div-common  hospitalOrg__div-flex">
              <span className="hospitalOrg__span hospitalOrg__p-subtext">
                Jerry Itunu
              </span>
              <span className="hospitalOrg__span hospitalOrg__p-subtext">
                jerry.itunu.094838@gmail.com
              </span>
              <span className="hospitalOrg__span hospitalOrg__p-subtext">
                CMD
              </span>
            </li>
            <li className="hospitalOrg__div-common  hospitalOrg__div-flex">
              <span className="hospitalOrg__span hospitalOrg__p-subtext">
                Jerry Itunu
              </span>
              <span className="hospitalOrg__span hospitalOrg__p-subtext">
                jerry.itunu.094838@gmail.com
              </span>
              <span className="hospitalOrg__span hospitalOrg__p-subtext">
                CMD
              </span>
            </li>
            <li className="hospitalOrg__div-common  hospitalOrg__div-flex">
              <span className="hospitalOrg__span hospitalOrg__p-subtext">
                Jerry Itunu
              </span>
              <span className="hospitalOrg__span hospitalOrg__p-subtext">
                jerry.itunu.094838@gmail.com
              </span>
              <span className="hospitalOrg__span hospitalOrg__p-subtext">
                CMD
              </span>
            </li>
          </ul>
          <div className="hospitalOrg__div-add">
            <LinkTo onClick={() => setOpen(!open)}>Add a new team-mate</LinkTo>
          </div>
        </div>
      </section>

      <div className="hospitalProfile__div-btn">
        <div className="btn_container-sub">
          <Buttons
            type="btn"
            color={"danger"}
            style={{ textTransform: "none" }}
            onClick={deleteHandler}
          >
            Leave organization
          </Buttons>
        </div>
      </div>
      {deleteOpen && (
        <Modal open={deleteOpen} close={deleteHandler}>
          {renderStep()}
        </Modal>
      )}
      {open && (
        <Modal open={open} close={() => setOpen(!open)} loading={true}>
          <DashboardTeam />
        </Modal>
      )}
    </main>
  );
};

export default Org;

export const DashboardDeleteAccount = ({
  close,
  text,
  nextStep,
  header,
  btnLeft,
  btnRight,
}) => {
  // const [open, setOpen] = useState(false);
  const initialValues = {
    delete: "",
  };

  const onSubmit = (values, { resetForm, setSubmitting }) => {
    console.log(values);
    setSubmitting(false);
    resetForm();
    nextStep();
  };
  // const onDelete = () => {};
  return (
    <main className="hospitalDeleteAccount">
      <header className="hospitalDeleteAccount__header">
        <p className="hospitalDeleteAccount__p-header">{header}</p>
        <p className="hospitalDeleteAccount__p-subheader">{text}</p>
      </header>

      <section className="hospitalDeleteAccount-content">
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          {({ isSubmitting, submitForm }) => (
            <form className="hospitalDeleteAccount__form">
              <TextAreaIcon
                placeholder={"Enter reason here"}
                inputName={"delete"}
                iconRight={<Edit />}
                style={{ width: "95%", height: "25vh" }}
              />
              <div className="hospitalDeleteAccount-btn">
                <div className="hospitalDeleteAccount-btn-1">
                  <Buttons
                    type="btn"
                    color="danger"
                    style={{
                      textTransform: "none",
                      whiteSpace: "nowrap",
                    }}
                    onClick={close}
                  >
                    {btnLeft}
                  </Buttons>
                </div>
                <div className="hospitalDeleteAccount-btn-1">
                  {" "}
                  <Buttons
                    color="danger-full"
                    style={{
                      textTransform: "none",
                      whiteSpace: "nowrap",
                    }}
                    disabled={isSubmitting}
                    type="submit"
                    onClick={(e) => {
                      e.preventDefault();
                      submitForm();
                    }}
                  >
                    {btnRight}
                  </Buttons>
                </div>
              </div>
            </form>
          )}
        </Formik>
      </section>
    </main>
  );
};

export const DashboardFinalDelete = ({
  close,
  text,
  header,
  btnLeft,
  btnRight,
  submitForm,
}) => {
  return (
    <main className="hospitalFinalDelete">
      <header
        className="hospitalFinalDelete__header"
        style={{ color: "#BC0202" }}
      >
        <Warning size={226} color="#12212280" />
        <p className="hospitalDeleteAccount__p-header">{header}</p>
        <p className="hospitalDeleteAccount__p-subheader">{text}</p>
      </header>
      <div className="hospitalDeleteAccount-btn">
        <div className="hospitalDeleteAccount-btn-1">
          <Buttons
            type="btn"
            color="danger"
            style={{ textTransform: "none", whiteSpace: "nowrap" }}
            onClick={close}
          >
            {btnLeft}
          </Buttons>
        </div>
        <div className="hospitalDeleteAccount-btn-1">
          <Buttons
            color="danger-full"
            style={{ textTransform: "none", whiteSpace: "nowrap" }}
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              submitForm();
            }}
          >
            {btnRight}
          </Buttons>
        </div>
      </div>
    </main>
  );
};

export const DashboardTeam = () => {
  const initialValues = {
    teamName: "",
    email: "",
  };

  const teamSchema = Yup.object().shape({
    teamName: Yup.string().required(),
    email: Yup.string().email().required(),
  });
  const onSubmit = (values, {  setSubmitting }) => {
    console.log(values);
    setSubmitting(false);
  };
  return (
    <main className="hospitalHome hospitalTeam">
      <DashHeader
        text="Add a team-mate"
        subText="Invite a team-mate to join your organization. No need for them to
          register. Just enter their name and email below, we'll send them their
          login information."
      />
      <section className="">
        <Formik
          initialValues={initialValues}
          validationSchema={teamSchema}
          onSubmit={onSubmit}
        >
          {({ values, errors, touched, handleChange, submitForm }) => (
            <form>
              <div className="input-container">
                <InputIcons
                  type={"text"}
                  inputName={"teamName"}
                  iconLeft={<User />}
                  iconRight={<Edit />}
                  placeholder={"Enter their name"}
                  value={values.teamName}
                  onChange={handleChange}
                  err={errors.teamName && touched.teamName}
                />
              </div>
              <div className="input-container">
                <InputIcons
                  type={"email"}
                  inputName={"email"}
                  iconLeft={<EnvelopeSimple />}
                  iconRight={<Edit />}
                  placeholder={"Enter their email"}
                  value={values.email}
                  onChange={handleChange}
                  err={errors.email && touched.email}
                />
              </div>
              <div className="btn_container">
                <div className="w-full">
                  <Buttons
                    color="primary"
                    type="submit"
                    disable={errors.teamName || errors.email}
                    onClick={(e) => {
                      e.preventDefault();
                      submitForm();
                    }}
                  >
                    Send Invite
                  </Buttons>
                </div>
              </div>
            </form>
          )}
        </Formik>
      </section>
    </main>
  );
};
DashboardDeleteAccount.propTypes = {
  close: PropTypes.func,
  text: PropTypes.string,
  nextStep: PropTypes.func,
  header: PropTypes.text,
  btnLeft: PropTypes.any,
  btnRight: PropTypes.any,
};
DashboardFinalDelete.propTypes = {
  close: PropTypes.func,
  text: PropTypes.string,
  nextStep: PropTypes.func,
  submitForm: PropTypes.func,
  header: PropTypes.text,
  btnLeft: PropTypes.any,
  btnRight: PropTypes.any,
};
