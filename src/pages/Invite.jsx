// eslint-disable-next-line no-unused-vars
import React from 'react'
import DashHeader from '../components/Dash/DashHeader';
import * as Yup from 'yup'
import { Formik } from 'formik';
import InputIcons from '../components/common/InputIcons';
import { ReactComponent as User } from '../assets/main/icon/user.svg'
import { ReactComponent as Edit } from '../assets/main/icon/edit-2.svg'
import { EnvelopeSimple } from 'phosphor-react';
import { Buttons } from '../components/buttons/Buttons';

const Invite = () => {
  const initialValues = {
    teamName: "",
    email: "",
  };

  const teamSchema = Yup.object().shape({
    teamName: Yup.string().required(),
    email: Yup.string().email().required(),
  });
  const onSubmit = (values, { resetForm, setSubmitting }) => {
    console.log(values);
    setSubmitting(true);
    resetForm()
  };
  return (
    <main className="hospitalHome hospitalTeam">
      <DashHeader
        text="Send an Invite"
        subText="Invite a team-mate to join your organization. No need for them to
          register. Just enter their name and email below, we'll send them their
          login information."
      />
      <section className="w-2/4">
        <Formik
          initialValues={initialValues}
          validationSchema={teamSchema}
          onSubmit={onSubmit}>
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
                    }}>
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


export default Invite