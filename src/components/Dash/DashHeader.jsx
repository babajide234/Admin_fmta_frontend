//eslint-disable-next-line no-unused-vars
import React from "react";
import PropTypes from "prop-types";

const DashHeader = ({ text, subText, small }) => {
  return (
    <header className="dashHeader__header">
      <h2 className={`${ small ? 'header__3' : 'header__2' } secondary`}>{text}</h2>
      <p className="p4 ink">{subText}</p>
    </header>
  );
};

DashHeader.propTypes = {
  text: PropTypes.string,
  subText: PropTypes.string,
  small: PropTypes.bool,
};
export default DashHeader;
