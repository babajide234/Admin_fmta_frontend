// eslint-disable-next-line no-unused-vars
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  //   DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import PropTypes from "prop-types";

const DialogContainer = ({ trigger, title, subtitle, open, onOpenChange, children }) => {

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px] dropdown-container box">
        <DialogHeader>
          <DialogTitle className="header__3 secondary">{title}</DialogTitle>
          <DialogDescription>{subtitle}</DialogDescription>
        </DialogHeader>
        {children}
        {/* <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
};
DialogContainer.propTypes = {
  trigger: PropTypes.any,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  children: PropTypes.node,
  open: PropTypes.bool,
  onOpenChange: PropTypes.func
};
export default DialogContainer;
