//eslint-disable-next-line no-unused-vars
import React from "react";
import { ArrowRight } from "phosphor-react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types'
const GoForward = ({ text, to }) => {
  return (
    
      <Link to={to}>
        <span className="goForward__span-text p_4">{text}</span>
        <ArrowRight size={20} color="#001973" style={{display: 'inline'}}/>
      </Link>

  );
};
GoForward.propTypes ={
  text: PropTypes.string,
  to: PropTypes.string,
  children: PropTypes.any,
}
export default GoForward;
