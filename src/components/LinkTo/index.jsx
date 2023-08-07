import React from "react";
import { Link } from "react-router-dom";

const LinkTo = ({ to, children, ...rest }) => {
  return (
    <Link to={to}>
      <span className="linkTo__span-text p-500 secondary" {...rest}>
        {children}
      </span>
    </Link>
  );
};

export default LinkTo;
