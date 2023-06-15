//eslint-disable-next-line no-unused-vars
import React from "react";
import ReactDOM from "react-dom";
import LoadingSpinnerComponent from "react-spinners-components";
import CenterModal from "../CenterModal";

const LoadingModal = ({ open, close, loading }) => {
  // const spinnerStyle = {color: 'linear-gradient(101.93deg, #001973 27.67%, #E0F2F9 117.22%)'}
  return ReactDOM.createPortal(
    <CenterModal open={open} close={close} loading={loading} size={"md"}>
      <LoadingSpinnerComponent
        type={"Rolling"}
        colors={["#001973", "#E0F2F9"]}
        size={"100px"}
      />
    </CenterModal>,
    document.body
  );
};

export default LoadingModal;
