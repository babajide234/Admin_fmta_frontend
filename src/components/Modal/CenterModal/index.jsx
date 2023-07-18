// eslint-disable-next-line no-unused-vars
import React, {useEffect} from "react";
import { X } from "phosphor-react";

const CenterModal = ({
  setTimeout,
  loading,
  open,
  text,
  close,
  children,
  ...rest
}) => {
 

  return (
    <div className={` centerModal  ${open ? "" : "centerModal__close"} `}>
      <div className="centerModal__container">
        {loading && (
          <div
            className="modal__closeBtn xs-hide sm-hide"
            onClick={() => close()}
          >
            <X size={20} weight="bold" color={"#ffffff"} />
          </div>
        )}
        <div className="centerModal__inner">{children}</div>
      </div>
    </div>
  );
};

export default CenterModal;
