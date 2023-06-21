//eslint-disable-next-line no-unused-vars
import React from "react";
import PropTypes from "prop-types";

const DashHeader = ({ text, subText, small = false, variant = "outline" }) => {
  const variants = {
    outline: {
      color: "#001973",
    },
    fill: {
      color: "#f1f6ff",
    },
    empty: {
      color: "#122122",
    },
  };
  const styles = variants[variant] || {};
  return (
    <header className="dashHeader__header">
      <h2 className={`${small ? "header__3" : "header__2"}`} style={styles}>
        {text}
      </h2>
      <p className="p4 ink">{subText}</p>
    </header>
  );
};

DashHeader.propTypes = {
  text: PropTypes.string,
  subText: PropTypes.string,
  small: PropTypes.bool,
  variant: PropTypes.oneOf(["outline", "fill", "empty"]),
};
export default DashHeader;
