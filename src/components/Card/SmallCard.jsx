// eslint-disable-next-line no-unused-vars
import React from "react";
import PropTypes from "prop-types";

const SmallCard = ({ title, text, subText, icon, variant = "outline" }) => {
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
  const styles = variants[variant] || {};
  return (
    <div className="smallcard">
      <div style={styles} className={`smallcard__div-container box`}>
        <div>
          <p className="smallcard__p-title header__5 ">{title}</p>
          <p className="smallcard__p-text p4 ">{text}</p>
          <p className="smallcard__p-subText p5 ">{subText}</p>
        </div>
        <div className={`smallcard__div-${variant}`}>{icon}</div>
      </div>
    </div>
  );
};
SmallCard.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
  subText: PropTypes.string,
  variant: PropTypes.oneOf(["outline", "fill", "empty"]),
  icon: PropTypes.any,
};

export default SmallCard;
