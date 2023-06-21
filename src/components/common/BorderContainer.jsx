// eslint-disable-next-line no-unused-vars
import React from "react";
import PropTypes from "prop-types";

const BorderContainer = ({ variant = "outline", width, children }) => {
  const variants = {
    outline: {
      color: "#001973",
      background: "transparent",
      border: "1px solid #001973",
    },
    fill: {
      color: "#f1f6ff",
      background: "#19b8ed",
      border: "1px solid #f1f6ff",
    },
    empty: {
      color: "#122122",
      background: "#f1f6ff",
      border: "1px solid #f1f6ff",
    },
  };
  const styles = {
    ...variants[variant],
    width: width || "100%",
    
  };
  return (
    <div className="borderContainer box" style={styles}>
      {children}
    </div>
  );
};

BorderContainer.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.oneOf(["outline", "fill", "empty"]),
  width: PropTypes.string,
};

export default BorderContainer;
