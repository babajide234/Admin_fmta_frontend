// eslint-disable-next-line no-unused-vars
import React from "react";
import { Buttons } from "../buttons/Buttons";
import PropTypes from "prop-types";

const AccountCard = ({
  icon,
  text,
  subText,
  to,
  btn,
  titleColor,
  btnColor,
  settings,
  pad,
  small,
}) => {
  return (
    <div
      className={`hospitalHome__card ${`hospitalHome__card-${pad}`} ${
        settings && "hospitalHome__card-settings"
      }`}
    >
      <div
        className={`${
          pad === "small"
            ? "hospitalHome__div-icon-small"
            : "hospitalHome__card-icon"
        }`}
      >
        {icon}
      </div>
      <div className="hospitalHome__card-right">
        <div className="hospitalHome__card-title">
          <p
            className={`${`hospitalHome__card-${titleColor}`} ${
              small
                ? "hospitalHome__card-text1-small p4 secondary"
                : "hospitalHome__card-text1 header__3 secondary"
            }`}
          >
            {text}
          </p>
          <p className={`hospitalHome__card-text2 p4 ink`}>{subText}</p>
        </div>
        <div className="hospitalHome__card-btn ">
          <Buttons
            type="link"
            to={to}
            color={btnColor}
            style={{
              textTransform: "none",
              whiteSpace: "nowrap",
            }}
          >
            <p>{btn}</p>
          </Buttons>
        </div>
      </div>
    </div>
  );
};

AccountCard.propTypes = {
  icon: PropTypes.any,
  text: PropTypes.any,
  subText: PropTypes.string,
  to: PropTypes.string,
  btn: PropTypes.any,
  titleColor: PropTypes.string,
  btnColor: PropTypes.string,
  settings: PropTypes.any,
  pad: PropTypes.any,
  small: PropTypes.any,
};
export default AccountCard;
