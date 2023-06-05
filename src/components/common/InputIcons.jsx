/* eslint-disable react/prop-types */
import { Field } from 'formik'

const InputIcons = ({
    inputName,
    iconleft,
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
    {iconleft && <span className="inputIcon__span-left">{iconleft}</span>}
    <span className="inputIcon__span-center">
      <Field
        name={inputName}
        id={inputName}
        type={type}
        placeholder={placeholder}
        {...rest}
      />
    </span>
    <label htmlFor={inputName} className={`inputIcon__label `}>{placeholder}</label>
    {iconRight && <span className="inputIcon__span-right">{iconRight}</span>}
  </div>
  )
}

export default InputIcons