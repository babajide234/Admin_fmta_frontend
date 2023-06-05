/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const LinkTo = ({to, children, ...rest}) => {
  return (
    <Link to={to} >
      <span className="linkTo__span-text" {...rest} >{children}</span>
    </Link>
  );
};

export default LinkTo;
