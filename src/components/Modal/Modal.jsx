// eslint-disable-next-line no-unused-vars
import React from "react";
import { X } from "phosphor-react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";

const Modal = ({ loading, open, close, children, ...rest }) => {
  return (
    <div className={` modal  ${open ? "" : "modal__close"} `}>
      <motion.div className="modal__container">
        {loading && (
          <div
            className="modal__closeBtn xs-hide sm-hide"
            onClick={() => close()}
          >
            <X size={20} weight="bold" color={"#ffffff"} />
          </div>
        )}
        <div className="xs-show sm-show md-hide xl-hide lg-hide modal__liner"></div>
        <div className="modal__inner ">{children}</div>
      </motion.div>
    </div>
  );
};

Modal.propTypes = {
  loading: PropTypes.bool,
  open: PropTypes.bool,
  close: PropTypes.func,
  children: PropTypes.node,
};
export default Modal;
