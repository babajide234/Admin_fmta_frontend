// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import Table from "../tables/table";
import { ArrowUpDown } from "lucide-react";
import { Checkbox } from "../../ui/checkbox";
import Actions from "../common/Actions";
import { DropdownMenuItem } from "../../ui/dropdown-menu";
import roleSlice from "../../store/roleSlice";


const CustomerTable = () => {
  const getUsersByRole = roleSlice.getState().getUsersByRole;
  const userColumn = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: ({ column }) => (
        <div
          className="text-left header__4 secondary flex items-center"
          onClick={() => column.toggleSorting(column.getisSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4 cursor-pointer" />
        </div>
      ),
      cell: ({ row }) => {
        return (
          <div className="text-left header__5 secondary-disabled capitalize">
            {row.getValue("name")}
          </div>
        );
      },
    },
    {
      accessorKey: "email",
      header: () => (
        <div className="text-left header__4 secondary flex items-center">
          Email
        </div>
      ),
      cell: ({ row }) => (
        <div className="text-left p5 secondary-disabled">
          {row.getValue("email")}
        </div>
      ),
    },
    {
      accessorKey: "phone",
      header: () => (
        <div className="text-left header__4 secondary flex items-center">
          Phone
        </div>
      ),
      cell: ({ row }) => (
        <div className="text-left p5 secondary-disabled">
          {row.getValue("phone")}
        </div>
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const action = row.original;

        return (
          <Actions action={action}>
            <DropdownMenuItem className="dropdown-options p4 tertiary">
              Verify
            </DropdownMenuItem>
            <DropdownMenuItem className="dropdown-options p4 tertiary">
              Disable
            </DropdownMenuItem>
            <DropdownMenuItem
              className="dropdown-options p4 tertiary"
              onClick={() => {
                // setData(action);
                // setName("customer");
                // setOpen(true);
              }}
            >
              Details
            </DropdownMenuItem>
          </Actions>
        );
      },
    },
  ];

  return (
    <div className="dashUser__div-table">
      <Table
        getData={() => getUsersByRole("customer")}
        columns={userColumn}
        filter={"name"}
      />
    </div>
  );
};
// CustomerTable.propTypes = {
//   setOpen: PropTypes.any,
//   setData: PropTypes.any,
//   setName: PropTypes.any,
// };
export default CustomerTable;