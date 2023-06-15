//eslint-disable-next-line no-unused-vars
import React from 'react'
import { Button } from "../../ui/button";
import PropTypes from "prop-types";

const PaginationControl = ({table}) => {
  return (
    <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
  )
}
PaginationControl.propTypes = {
    table: PropTypes.any,
  };
export default PaginationControl