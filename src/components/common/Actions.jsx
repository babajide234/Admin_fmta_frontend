// eslint-disable-next-line no-unused-vars
import React from "react";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { Button } from "../../ui/button";
import PropTypes from "prop-types";

const Actions = ({children }) => {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="dropdown-container">
          <DropdownMenuLabel className="secondary header__4">
            Actions
          </DropdownMenuLabel>
          <DropdownMenuItem
          // onClick={() => navigator.clipboard.writeText(action.id)}
          ></DropdownMenuItem>
          <DropdownMenuSeparator />
          {children}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
Actions.propTypes = {
  action: PropTypes.any,
  children: PropTypes.node,
};
export default Actions;
