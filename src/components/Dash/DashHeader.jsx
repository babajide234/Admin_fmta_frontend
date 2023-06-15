//eslint-disable-next-line no-unused-vars
import React from "react";
import PropTypes from "prop-types";

const DashHeader = ({ text, subText }) => {
  return (
    <header className=" __header">
      <h2 className="header__2 secondary">{text}</h2>
      <p className="p4 ink">{subText}</p>
    </header>
  );
};

DashHeader.propTypes = {
  text: PropTypes.string,
  subText: PropTypes.string,
};
export default DashHeader;
