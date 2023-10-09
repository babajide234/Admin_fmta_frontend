// eslint-disable-next-line no-unused-vars
import React from "react";
import PropTypes from "prop-types";

const BuyDropdown = ({ name, image, category, subcategory, ...rest }) => {
  return (
    <div className="input__dropdown__item" {...rest}>
      <div className="input__dropdown__item__img">
        <img src={image} alt="" className="" />
      </div>
      <div className="input__dropdown__item__text">
        <h3>{name}</h3>
        <p>
          In {subcategory}, {category}
        </p>
      </div>
    </div>
  );
};

BuyDropdown.propTypes = {
  name: PropTypes.string,
  image: PropTypes.any,
  category: PropTypes.string,
  subcategory: PropTypes.string,
};
export default BuyDropdown;
