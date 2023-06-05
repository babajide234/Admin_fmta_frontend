/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

export const Buttons = ({
  color,
  to,
  disable,
  hover,
  children,
  type,
  ...rest
}) => {
  // console.log(disabled)
  return (
    <>
      {(type == "btn" || type == "submit") && (
        <button
          className={`btn btn__default ${ disable ? "btn-disable" : ``} ${`btn__${color}`}  ${hover ? `btn-hover` : ""}`}
          {...rest}
        >
          {children}
        </button>
      )}
      {type == "link" && (
        <Link
          to={disable ? null : to}
          className={` btn__default ${
            disable ? "btn-disable" : `btn__${color}`
          }`}
          {...rest}
        >
          {children}
        </Link>
      )}
    </>
  );
};
