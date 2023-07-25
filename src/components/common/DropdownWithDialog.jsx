// eslint-disable-next-line no-unused-vars
import React, { forwardRef, useState, useRef } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as Dialog from "@radix-ui/react-dialog";
import PropTypes from "prop-types";
import { XCircle } from "lucide-react";
import { Button } from "../../ui/button";
import { MoreHorizontal } from "lucide-react";

const DropdownWithDialog = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [hasOpenDialog, setHasOpenDialog] = useState(false);
  const dropdownTriggerRef = useRef(null);
  const focusRef = useRef(null);

  function handleDialogItemSelect() {
    focusRef.current = dropdownTriggerRef.current;
  }

  function handleDialogItemOpenChange(open) {
    setHasOpenDialog(open);
    if (open === false) {
      setDropdownOpen(false);
    }
  }

  return (
    <DropdownMenu.Root open={dropdownOpen} onOpenChange={setDropdownOpen}>
      <DropdownMenu.Trigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content
        className="DropdownMenuContent"
        sideOffset={5}
        hidden={hasOpenDialog}
        onCloseAutoFocus={(event) => {
          if (focusRef.current) {
            focusRef.current.focus();
            focusRef.current = null;
            event.preventDefault();
          }
        }}
      >
        <DropdownMenu.Group>
          <DropdownMenu.Label className="DropdownMenuLabel">
            Items with dialog
          </DropdownMenu.Label>
          <DialogItem
            triggerChildren="Edit"
            onSelect={handleDialogItemSelect}
            onOpenChange={handleDialogItemOpenChange}
          >
            <Dialog.Title className="DialogTitle">Edit</Dialog.Title>
            <Dialog.Description className="DialogDescription">
              Edit this record below.
            </Dialog.Description>
            <p>…</p>
          </DialogItem>

          <DialogItem
            triggerChildren="Delete"
            onSelect={handleDialogItemSelect}
            onOpenChange={handleDialogItemOpenChange}
          >
            <Dialog.Title className="DialogTitle">Delete</Dialog.Title>
            <Dialog.Description className="DialogDescription">
              Are you sure you want to delete this record?
            </Dialog.Description>
          </DialogItem>
        </DropdownMenu.Group>

        <DropdownMenu.Separator className="DropdownMenuSeparator" />

        <DropdownMenu.Group>
          <DropdownMenu.Label className="DropdownMenuLabel">
            Regular items
          </DropdownMenu.Label>
          <DropdownMenu.Item className="DropdownMenuItem">
            Duplicate
          </DropdownMenu.Item>
          <DropdownMenu.Item className="DropdownMenuItem">
            Copy
          </DropdownMenu.Item>
          <DropdownMenu.Item className="DropdownMenuItem">
            Save
          </DropdownMenu.Item>
        </DropdownMenu.Group>

        <DropdownMenu.Arrow className="DropdownMenuArrow" />
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default DropdownWithDialog;

export const DialogItem = forwardRef((props, forwardedRef) => {
  const { triggerChildren, children, onSelect, onOpenChange, ...itemProps } =
    props;
  return (
    <Dialog.Root onOpenChange={onOpenChange}>
      <Dialog.Trigger asChild>
        <DropdownMenu
          {...itemProps}
          ref={forwardedRef}
          className="DropdownMenuItem dropdown-options p4 secondary "
          onSelect={(event) => {
            event.preventDefault();
            onSelect && onSelect();
          }}
        >
          {triggerChildren}
        </DropdownMenu>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="DialogContent">
          {children}
          <Dialog.Close asChild>
            <button className="IconButton" aria-label="Close">
              <XCircle />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
});

DialogItem.displayName = "DialogItem";

DialogItem.propTypes = {
  triggerChildren: PropTypes.any,
  onSelect: PropTypes.any,
  onOpenChange: PropTypes.any,
  children: PropTypes.node,
};
