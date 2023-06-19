//eslint-disable-next-line no-unused-vars
import React from "react";
import { CaretDown } from "phosphor-react";
import { Field } from "formik";

import PropTypes from "prop-types";
import LoadingSpinnerComponent from "react-spinners-components";
import { DatePicker } from "./DatePicker";

const InputIcons = ({
  inputName,
  iconLeft,
  iconRight,
  pad,
  type,
  placeholder,
  err,
  ...rest
}) => {
  return (
    <div
      className={`inputIcon ${
        err ? "inputIcon__error" : "inputIcon__default"
      } `}
      style={{ paddingBottom: pad }}
    >
      {iconLeft && (
        <span
          className={`inputIcon__span-left ${
            err ? "inputIcon__svg-error" : " "
          }`}
        >
          {iconLeft}
        </span>
      )}

      <Field
        name={inputName}
        id={inputName}
        type={type}
        placeholder={placeholder}
        className="p-500 secondary inputIcon__span-center"
        {...rest}
      />

      <label
        htmlFor={inputName}
        className={`inputIcon__label p-500 ${err ? 'error' : 'secondary-disabled' }`}
      >
        {placeholder}
      </label>
      {iconRight && (
        <span
          className={`inputIcon__span-right ${
            err ? "inputIcon__svg-error" : " "
          }`}
        >
          {iconRight}
        </span>
      )}
    </div>
  );
};
InputIcons.propTypes = {
  inputName: PropTypes.string,
  iconLeft: PropTypes.any,
  iconRight: PropTypes.any,
  pad: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  err: PropTypes.bool,
};
export default InputIcons;

export const CustomSelectButton = ({
  name,
  iconLeft,
  err,
  children,
  label,
  loading,
  ...rest
}) => {
  return (
    <div
      className={`inputIcon ${
        err ? "inputIcon__error" : "inputIcon__default"
      } `}
    >
      {iconLeft && (
        <span
          className={`inputIcon__span-left ${
            err ? "inputIcon__svg-error" : " "
          }`}
        >
          {iconLeft}
        </span>
      )}

      <Field name={name} id={name}>
        {({ field }) => (
          <select
            {...field}
            {...rest}
            className="inputIcon-select appearance-none bg-transparent block w-full px-4  rounded-md focus:outline-none  font-medium text-inherit p-500 secondary"
          >
            {children}
          </select>
        )}
      </Field>
      {label && (
        <label className="inputIcon-select-label p-500 secondary-disabled">
          {label}
        </label>
      )}
      {loading ? (
        <div className="inputIcon__span-right">
          <LoadingSpinnerComponent
            type={"DualBall"}
            colors={["#001973", "#122122", "#19b8ed"]}
            size={"100px"}
          />
        </div>
      ) : (
        <div
          className={`inputIcon__span-right inset-y-0 right-0 flex items-center px-2 pointer-events-none ${
            err ? "inputIcon__svg-error" : " "
          }`}
        >
          <label htmlFor={name}>
            <CaretDown size={20} color="#001973" />
          </label>
        </div>
      )}
    </div>
  );
};
CustomSelectButton.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  iconLeft: PropTypes.any,
  err: PropTypes.bool,
  loading: PropTypes.bool,
  children: PropTypes.any,
};

export const TextAreaIcon = ({
  inputName,
  placeholder,
  iconRight,
  iconLeft,

  err,
  ...rest
}) => {
  return (
    <div className={`textArea ${err ? "textArea-error" : ""}`}>
      {iconLeft && <span className="textArea__span-left">{iconLeft}</span>}
      <Field
        name={inputName}
        as="textarea"
        placeholder={placeholder}
        {...rest}
        className="textArea__input"
      />
      <label
        htmlFor={inputName}
        className={`textArea__label  p-500  ${err ? 'error' : 'secondary-disabled' }`}
      >
        {placeholder}
      </label>
      {iconRight && <span className="textArea__span-right">{iconRight}</span>}
    </div>
  );
};
TextAreaIcon.propTypes = {
  inputName: PropTypes.string,
  iconLeft: PropTypes.any,
  iconRight: PropTypes.any,
  placeholder: PropTypes.string,
  err: PropTypes.bool,
};

export const DatePickerField = ({
  inputName,
  iconLeft,
  iconRight,
  pad,
  placeholder,
  err,
  ...rest
}) => {
  return (
    <div
      className={`inputIcon ${
        err ? "inputIcon__error" : "inputIcon__default"
      } `}
      style={{ paddingBottom: pad }}
    >
      {iconLeft && (
        <span
          className={`inputIcon__span-left ${
            err ? "inputIcon__svg-error" : " "
          }`}
        >
          {iconLeft}
        </span>
      )}
     <Field name={inputName}>
        {({ field, form }) => (
          <DatePicker
            selected={field.value}
            onSelect={(date) => form.setFieldValue(field.name, date)}
            {...rest}
          />
        )}
      </Field>

      <label htmlFor={inputName} className={`inputIcon__label-2 `}>
        {placeholder}
      </label>
      {iconRight && (
        <span
          className={`inputIcon__span-right ${
            err ? "inputIcon__svg-error" : " "
          }`}
        >
          {iconRight}
        </span>
      )}
    </div>
  );
};
DatePickerField.propTypes = {
  inputName: PropTypes.string,
  iconLeft: PropTypes.any,
  iconRight: PropTypes.any,
  pad: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  err: PropTypes.bool,
};
