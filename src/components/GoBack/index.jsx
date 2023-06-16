//eslint-disable-next-line no-unused-vars
import React from "react";
import { Link } from "react-router-dom";
import { CaretLeft } from "phosphor-react";
import PropTypes from 'prop-types'
const GoBack = ({to, children, ...rest}) => {
  return (
    <Link to={to}>
      <span className="goBack" {...rest}>
        <CaretLeft size={16} weight="bold" style={{ display: "inline" , verticalAlign: 'middle'}} />
        <span className="goBack__text">{children}</span>
      </span>
    </Link>
  );
};
GoBack.propTypes ={
  to: PropTypes.string,
  children: PropTypes.any,
} 
export default GoBack;
