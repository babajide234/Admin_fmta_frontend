// eslint-disable-next-line no-unused-vars
import React from "react";
import ReactDOM from "react-dom";
import Modal from "../Modal";
import { ReactComponent as Tick_circle3 } from "../../../assets/main/icon/tick-circle3.svg";

const SuccessModal = ({ open, close, loading, header, text, children }) => {
  return ReactDOM.createPortal(
    <Modal open={open} loading={loading} close={close}>
      <div className="flex flex-col justify-center items-center">
        <div className="modal__div-icon">
          <Tick_circle3 />
        </div>

        <div className="modal__div-success">
          <p className="modal__p-success capitalize">{header ? header : "Success!"}</p>
          <p className="modal__p-text capitalize">{text}</p>
        </div>
        {children}
      </div>
    </Modal>,
    document.body
  );
};

export default SuccessModal;
