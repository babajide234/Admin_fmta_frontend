// eslint-disable-next-line no-unused-vars
import React from "react";
import ReactDOM from "react-dom";
import { ReactComponent as Close_circle } from "../../../assets/main/icon/close-circle.svg";
import Modal from "../Modal";

const FailedModal = ({
  icon,
  open,
  close,
  text,
  header,
  children,
  loading,
}) => {
  return ReactDOM.createPortal(
    <Modal open={open} loading={loading} close={() => close()}>
      <div className="flex flex-col justify-center items-center gap-4">
        {icon && (
          <div className="modal__div-icon">
            <Close_circle />
          </div>
        )}
        <div className="modal__div-success">
          <p className="modal__p-success capitalize">
            {header ? header : '"Failed!"'}{" "}
          </p>
          <p className="modal__p-text capitalize">{text}</p>
        </div>
        {children}
      </div>
    </Modal>,
    document.body
  );
};

export default FailedModal;
