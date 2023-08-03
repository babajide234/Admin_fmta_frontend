// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import GoBack from "../GoBack";
import { Field, Form, Formik } from "formik";
import { ReactComponent as Edit } from "../../assets/main/icon/edit-2.svg";
import { ReactComponent as Lock } from "../../assets/main/icon/lock.svg";
import LinkTo from "../../components/LinkTo";
import Modal from "../../components/Modal/Modal";
import InputIcons, { TextAreaIcon } from "../../components/common/InputIcons";
import { Eye, EyeSlash, Warning } from "phosphor-react";
import userSlice from "../../store/userStore";
import { motion } from "framer-motion";
import * as Yup from "yup";
import { useMutation } from "react-query";
import PropTypes from "prop-types";
import DashHeader from "../Dash/DashHeader";
import { Buttons } from "../buttons/Buttons";
import SuccessModal from "../Modal/SucessModal";
import FailedModal from "../Modal/FailedModal";

const profileStyle = { width: "20px", height: "20px", color: "#bababa" };

const Profile = () => {
  const [open, setOpen] = useState(false);
  const [changeSuccess, setChangeSucess] = useState(false);
  const [changeFailed, setChangeFailed] = useState(false);
  const [edit1, setEdit1] = useState(false);
  const [edit2, setEdit2] = useState(false);
  const [edit3, setEdit3] = useState(false);
  const [save, setSave] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [step, setStep] = useState(1);
  const details = userSlice((state) => state.details);
  const editProfile = userSlice((state) => state.editProfile);
  const modalHandler = () => {
    setOpen(!open);
  };
  //DELETE MODAL HANDLER
  const deleteHandler = () => {
    setStep(1);
    setDeleteOpen(!deleteOpen);
  };
  //EDIT STATE HANDLER
  const editHandler = (num) => {
    switch (num) {
      case 1:
        return setEdit1(!edit1);
      case 2:
        return setEdit2(!edit2);
      case 3:
        return setEdit3(!edit3);
      default:
        return null;
    }
  };
  // STEP FORM HANDLER
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
            header={"Delete your account?"}
            text={
              "You clicked on on delete my account. This will delete all of your records from our system. To continue, please tell us why you'd want to delete your account."
            }
            btnLeft={"This was a mistake"}
            btnRight={"Delete my account"}
          />
        );
      case 2:
        return (
          <DashboardFinalDelete
            close={deleteHandler}
            text="Are you sure you want to delete your account?"
            header={"This will delete your account!"}
            btnLeft={"This was a mistake"}
            btnRight={"Yes, delete my account"}
          />
        );
      default:
        return null;
    }
  };

  // INITIAL VALUES FOR FORMIK FORM
  const InitialValues = {
    name: details?.name ? details?.name : "",
    email: details?.email ? details?.email : "",
    phone: details?.phone ? details?.phone : "",
  };

  // YUP PROFILE SCHEMA
  const ProfileSchema = Yup.object().shape({
    name: Yup.string().required(),
    email: Yup.string().email().required(),
    phone: Yup.string().min(11).required(),
  });

  //USEMUTATION HOOK OF REACT-QUERY

  const editProfileMutation = useMutation((formData) => editProfile(formData), {
    onSucess: () => {
      setSave(true);
    },
    onError: (error) => {
      console.log(error);
    },
  });
  //SUBMIT FUNC OF FORMIK
  const onSubmit = (values) => {
    console.log(values);
    editProfileMutation.mutate(values);
  };

  return (
    <main className="hospitalProfile ">
      <GoBack to="/account">Go back</GoBack>

      <DashHeader
        text={"Profile Settings"}
        subtext={"Make changes to your profile"}
      />
      <section className="hospitalProfile-content">
        <Formik
          initialValues={InitialValues}
          validationSchema={ProfileSchema}
          onSubmit={onSubmit}
        >
          {({ errors, touched, submitForm, values, handleChange }) => (
            <Form className="hospitalProfile__form">
              <ProfileInput
                inputName={"name"}
                label="name"
                type="text"
                edit={edit1}
                onChange={handleChange}
                value={values.name}
                err={errors.name && touched.name}
              >
                {edit1 ? (
                  <>
                    {!save && !editProfileMutation.isLoading && (
                      <motion.span
                        initial={{ x: "100%", opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{
                          ease: "linear",
                          duration: 3,
                          x: { duration: 1 },
                        }}
                        className="hospitalInput__span-icon hospitalInput__span-save"
                        onClick={(e) => {
                          submitForm();
                          e.preventDefault();
                          //editHandler(1);
                        }}
                      >
                        Save update
                      </motion.span>
                    )}
                    {editProfileMutation.isLoading && (
                      <span className="hospitalInput__span-icon hospitalInput__span-save">
                        Saving...
                      </span>
                    )}
                    {!editProfileMutation.isLoading && save && (
                      <span className="hospitalInput__span-icon hospitalInput__span-save">
                        Saved!
                      </span>
                    )}
                  </>
                ) : (
                  <span
                    className="hospitalInput__span-icon"
                    onClick={() => editHandler(1)}
                  >
                    <Edit style={profileStyle} />
                  </span>
                )}
              </ProfileInput>

              <ProfileInput
                inputName={"email"}
                label="email"
                type="email"
                edit={edit2}
                disabled={true}
                values={values.email}
                onChange={handleChange}
                err={errors.email && touched.email}
              >
                {edit2 ? (
                  <motion.span
                    initial={{ x: "100%", opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{
                      ease: "linear",
                      duration: 2,
                      x: { duration: 1 },
                    }}
                    className="hospitalInput__span-icon hospitalInput__span-save"
                    // onClick={(e) => {
                    //   submitForm();
                    //   e.preventDefault();
                    //   editHandler(2);
                    // }}
                  >
                    Save update
                  </motion.span>
                ) : (
                  <span
                    className="hospitalInput__span-icon"
                    // onClick={() => editHandler(2)}
                  >
                    <Edit style={profileStyle} />
                  </span>
                )}
              </ProfileInput>

              <ProfileInput
                inputName={"phone"}
                label="Phone"
                type="text"
                edit={edit3}
                value={values.phone}
                onChange={handleChange}
                err={errors.phone && touched.phone}
              >
                {edit3 ? (
                  <>
                    {!save && !editProfileMutation.isLoading && (
                      <motion.span
                        initial={{ x: "100%", opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{
                          ease: "linear",
                          duration: 2,
                          x: { duration: 1 },
                        }}
                        className="hospitalInput__span-icon hospitalInput__span-save"
                        onClick={(e) => {
                          submitForm();
                          e.preventDefault();
                          editHandler(3);
                        }}
                      >
                        Save update
                      </motion.span>
                    )}
                    {editProfileMutation.isLoading && (
                      <span className="hospitalInput__span-icon hospitalInput__span-save">
                        Saving...
                      </span>
                    )}
                    {!editProfileMutation.isLoading && save && (
                      <span className="hospitalInput__span-icon hospitalInput__span-save">
                        Saved!
                      </span>
                    )}
                  </>
                ) : (
                  <span
                    className="hospitalInput__span-icon"
                    onClick={() => editHandler(3)}
                  >
                    <Edit style={profileStyle} />
                  </span>
                )}
              </ProfileInput>
            </Form>
          )}
        </Formik>
        <section className="hospitalProfile__div-password">
          <p className="hospitalInput__label">Password</p>
          <div className="hospitalProfile__p-password">
            <p className="hospitalProfile__p-hidden">***********</p>
            <LinkTo onClick={modalHandler}>Change password</LinkTo>
          </div>
        </section>
      </section>
      <div className="hospitalProfile__div-btn">
        <div className="btn_container">
          <Buttons
            type="btn"
            color={"danger"}
            style={{ whiteSpace: "nowrap" }}
            onClick={deleteHandler}
          >
            Delete my account
          </Buttons>
        </div>
      </div>
      {open && (
        <Modal open={open} close={modalHandler}>
          <DashboardChangePassword
            close={modalHandler}
            changeSuccess={changeSuccess}
            setChangeSucess={setChangeSucess}
            changeFailed={changeFailed}
            setChangeFailed={setChangeFailed}
          />
        </Modal>
      )}
      {deleteOpen && (
        <Modal open={deleteOpen} close={deleteHandler}>
          {renderStep()}
        </Modal>
      )}
      {changeSuccess && (
        <SuccessModal
          open={changeSuccess}
          icon={false}
          loading={true}
          text="Well done! You have succesffully changed your password."
          close={() => setChangeSucess(!changeSuccess)}
        ></SuccessModal>
      )}
      {changeFailed && (
        <FailedModal
          open={changeFailed}
          icon={false}
          close={() => setChangeFailed(!changeFailed)}
          loading={true}
          text={
            "You entered an incorrect password to your account, please confirm it and try again"
          }
        ></FailedModal>
      )}
    </main>
  );
};

export default Profile;

export const ProfileInput = ({
  inputName,
  label,
  type,
  edit,
  placeholder,
  err,
  children,
  ...rest
}) => {
  return (
    <div className="hospitalInput">
      <span className="hospitalInput__label">{label}</span>
      <div className="hospitalInput__pop">
        <Field
          name={inputName}
          type={type}
          placeholder={placeholder}
          disabled={!edit}
          className={`hospitalInput__input ${edit && "hospitalInput__border"} ${
            err && "hospitalInput__err"
          }`}
          {...rest}
        />
        {children}
      </div>
    </div>
  );
};

export const DashboardChangePassword = ({
  close,
  changeSuccess,
  setChangeSucess,
  changeFailed,
  setChangeFailed,
}) => {
  const [show_1, setState_1] = useState(false);
  const [show_2, setState_2] = useState(false);
  const [show_3, setState_3] = useState(false);
  const changePassword = userSlice((state) => state.changePassword);

  const togglePasswordVisibility = (id) => {
    switch (id) {
      case 1:
        setState_1(!show_1);
        break;
      case 2:
        setState_2(!show_2);
        break;
      case 3:
        setState_3(!show_3);
        break;
      default:
        break;
    }
  };

  const initialValues = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const ChangePasswordSchema = Yup.object().shape({
    oldPassword: Yup.string().required(),
    newPassword: Yup.string().required().min(4),
    confirmPassword: Yup.string()
      .required()
      .oneOf([Yup.ref("newPassword"), null]),
  });

  const changeMutation = useMutation((data) => changePassword(data), {
    onSuccess: (data) => {
      if (data && data.status) {
        setChangeSucess(!changeSuccess);
      } else {
        setChangeFailed(!changeFailed);
      }
    },
    onError: (error) => {
      console.log(error);
    },
  });
  const onSubmit = (values, { resetForm, setSubmitting }) => {
    const formData = {
      old_password: values.oldPassword,
      password: values.newPassword,
    };

    console.log(formData);
    changeMutation.mutate(formData);
    setSubmitting(false);
    resetForm();
    close();
  };

  return (
    <main className="hospitalChangePassword">
      <GoBack onClick={close}>Go back</GoBack>
      <header className="addressInput__header">
        <p className="addressInput__p-main">Change your account password</p>
        <p className="addressInput__p-sub">Enter the details below.</p>
      </header>
      <section className="hospitalChangePassword-content">
        <Formik
          initialValues={initialValues}
          validationSchema={ChangePasswordSchema}
          onSubmit={onSubmit}
        >
          {({ values, errors, touched, handleChange, submitForm }) => (
            <form>
              <div className="input-container">
                <InputIcons
                  iconLeft={<Lock />}
                  iconRight={
                    <span onClick={() => togglePasswordVisibility(1)}>
                      {show_1 ? <Eye /> : <EyeSlash />}
                    </span>
                  }
                  type={show_1 ? "text" : "password"}
                  inputName={"oldPassword"}
                  placeholder={"Enter your old password"}
                  value={values.oldPassword}
                  onChange={handleChange}
                  err={errors.oldPassword && touched.oldPassword}
                />
              </div>
              <div className="input-container">
                <InputIcons
                  iconLeft={<Lock />}
                  iconRight={
                    <span onClick={() => togglePasswordVisibility(2)}>
                      {show_2 ? <Eye /> : <EyeSlash />}
                    </span>
                  }
                  type={show_2 ? "text" : "password"}
                  inputName={"newPassword"}
                  placeholder={"Enter your new password"}
                  value={values.newPassword}
                  onChange={handleChange}
                  err={errors.newPassword && touched.newPassword}
                />
              </div>
              <div className="input-container">
                <InputIcons
                  iconLeft={<Lock />}
                  iconRight={
                    <span onClick={() => togglePasswordVisibility(3)}>
                      {show_3 ? <Eye /> : <EyeSlash />}
                    </span>
                  }
                  type={show_3 ? "text" : "password"}
                  inputName={"confirmPassword"}
                  placeholder={"Confirm your new password"}
                  value={values.confirmPassword}
                  onChange={handleChange}
                  err={errors.confirmPassword && touched.confirmPassword}
                />
              </div>
              <div className="btn_container">
                <div className="w-full">
                  <Buttons
                    color="primary"
                    type="submit"
                    disable={errors.newPassword || errors.confirmPassword}
                    onClick={(e) => {
                      e.preventDefault();
                      submitForm();
                    }}
                  >
                    Change password
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
            <Form className="hospitalDeleteAccount__form">
              <TextAreaIcon
                placeholder={"Enter reason here"}
                inputName={"delete"}
                iconRight={<Edit style={profileStyle} />}
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
            </Form>
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
              // submitForm();
            }}
          >
            {btnRight}
          </Buttons>
        </div>
      </div>
    </main>
  );
};

ProfileInput.propTypes = {
  inputName: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  iconRight: PropTypes.any,
  edit: PropTypes.any,
  editHandler: PropTypes.func,
  placeholder: PropTypes.string,
  err: PropTypes.bool,
  children: PropTypes.node,
};

DashboardChangePassword.propTypes = {
  close: PropTypes.func,
  changeSuccess: PropTypes.bool,
  setChangeSucess: PropTypes.func,
  changeFailed: PropTypes.bool,
  setChangeFailed: PropTypes.func,
};

DashboardDeleteAccount.propTypes = {
  close: PropTypes.func,
  text: PropTypes.string,
  nextStep: PropTypes.func,
  header: PropTypes.string,
  btnLeft: PropTypes.any,
  btnRight: PropTypes.any,
};

DashboardFinalDelete.propTypes = {
  close: PropTypes.func,
  text: PropTypes.string,
  header: PropTypes.string,
  btnLeft: PropTypes.any,
  btnRight: PropTypes.any,
};
