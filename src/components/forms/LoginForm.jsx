/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import userSlice from '../../store/userStore';
import InputIcons from '../common/InputIcons';

import { ReactComponent as GoogleIcon } from '../../assets/icons8-google-96.svg';
import { ReactComponent as Edit } from '../../assets/img/edit.svg';
import { ReactComponent as Sms } from '../../assets/main/icon/sms2.svg';
import { ReactComponent as Lock } from '../../assets/main/icon/lock.svg';
import { EnvelopeSimple, Info } from 'phosphor-react';
import { Eye, EyeSlash } from 'phosphor-react';
import { Form, Formik } from 'formik';
import { Buttons } from '../buttons/Buttons';
import { iconStyle } from '../../util/util';
import LinkTo from '../common/LinkTo';

const LoginForm = () => {
  const [input, setInput] = useState('email');
  const [show_1, setState_1] = useState(false);
  const [open, setOpen] = useState(false);
  const [failed, setFailed] = useState(false);
  const login = userSlice((state) => state.login);
  const navigate = useNavigate();

  const initialValues = {
    email: '',
    phone: '',
    password: '',
  };

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address'),
    password: Yup.string().required('Password is required'),
  });

  const mutation = useMutation((formData) => login(formData), {
    onSuccess: (data) => {
      if (data && data.response && data.response.status === 401) {
        setFailed(true);
      } else {
        //   setOpen(!open);
        navigate('/');
      }
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const onSubmit = (values, { resetForm, setSubmitting }) => {
    const payload =
      input == 'email'
        ? { email: values.email, password: values.password }
        : { phone: values.phone, password: values.password };
    console.log(payload);
    mutation.mutate(payload);
    setSubmitting(false);
  };

  const failedHandler = () => {
    setFailed(!failed);
  };

  const togglePasswordVisibility = () => {
    setState_1(!show_1);
  };

  const changePlaceholer = () => {
    if (input == 'email') {
      setInput('phone');
    }

    if (input == 'phone') {
      setInput('email');
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={LoginSchema}
      onSubmit={onSubmit}
    >
      {({
        errors,
        touched,
        values,
        handleChange,
        isSubmitting,
        submitForm,
      }) => (
        <Form>
          <div className="loginForm__form-row1">
            <span className="loginForm__span-row1">
              <InputIcons
                type={input == 'email' ? 'email' : 'text'}
                inputName={input == 'email' ? 'email' : 'phone'}
                iconLeft={<Sms />}
                iconRight={<Edit />}
                placeholder={
                  input == 'email'
                    ? 'Enter your email address'
                    : 'Enter your phone number'
                }
                value={input == 'email' ? values.email : values.phone}
                onChange={handleChange}
                err={
                  (errors.email || errors.phone) &&
                    (touched.email || touched.phone)
                    ? true
                    : false
                }
              />
            </span>
            <span className="loginForm__span-switch" onClick={changePlaceholer}>
              {input == 'email' ? 'Use phone number' : 'Use email address'}
            </span>
          </div>

          <InputIcons
            inputName={'password'}
            type={show_1 ? 'text' : 'password'}
            iconLeft={<Lock style={iconStyle} />}
            iconRight={
              <span onClick={() => togglePasswordVisibility()}>
                {show_1 ? (
                  <Eye size={20} color="#bababa" />
                ) : (
                  <EyeSlash size={20} color="#bababa" />
                )}
              </span>
            }
            placeholder={'Enter your password'}
            className="password-input"
            value={values.password}
            onChange={handleChange}
            err={errors.password && touched.password ? true : false}
          />

          <div className="loginForm__info">
            <span className="loginForm__info-icon">
              <Info size={20} />
            </span>

            <span className="loginForm__info-fPass">
              if you forgot your password,
            </span>
            <LinkTo to={'/forgot-password'}>Click here to reset it</LinkTo>
          </div>

          <Buttons
            color={'primary'}
            disabled={isSubmitting}
            type="submit"
            style={{ textTransform: 'none' }}
            disable={
              (values.email != '' || values.phone != '') &&
                values.password != ''
                ? false
                : true
            }
            onClick={(e) => {
              e.preventDefault();
              submitForm();
            }}
          >
            Continue
          </Buttons>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
