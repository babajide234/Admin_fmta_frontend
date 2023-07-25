// eslint-disable-next-line no-unused-vars
import React from "react";
import Table from "../../components/tables/table";
import { ArrowUpDown } from "lucide-react";
import { Checkbox } from "../../ui/checkbox";
import Actions from "../common/Actions";
import { DropdownMenuItem } from "../../ui/dropdown-menu";
import { formatDateTime } from "../../util/util";
import roleSlice from "../../store/roleSlice";
import PropTypes from "prop-types";

const VendorTable = ({ setData, setName, setOpen }) => {
  const getUsersByRole = roleSlice.getState().getUsersByRole;

  const vendorColumn = [
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
      accessorKey: "store",
      header: ({ column }) => (
        <div
          className="text-left header__4 secondary flex items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Store
          <ArrowUpDown className="ml-2 h-4 w-4 cursor-pointer" />
        </div>
      ),
      cell: ({ row }) => {
        const store = row.original.meta.org_name;
        return (
          <div className="text-left header__5 secondary capitalize">
            {store}
          </div>
        );
      },
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
    // {
    //   accessorKey: "role",
    //   header: ({ column }) => (
    //     <div
    //       className="text-left header__4 secondary flex items-center"
    //       onClick={() => column.toggleSorting(column.getisSorted() === "asc")}
    //     >
    //       Role
    //       <ArrowUpDown className="ml-2 h-4 w-4 cursor-pointer" />
    //     </div>
    //   ),
    //   cell: ({ row }) => (
    //     <div className="text-left p5 secondary-disabled">
    //       {row.getValue("role")}
    //     </div>
    //   ),
    // },
    {
      accessorKey: "email_verified_at",
      header: ({ column }) => (
        <div
          className="text-left header__4 secondary flex items-center"
          onClick={() => column.toggleSorting(column.getisSorted() === "asc")}
        >
          Verified
          <ArrowUpDown className="ml-2 h-4 w-4 cursor-pointer" />
        </div>
      ),
      cell: ({ row }) => (
        <div
          className={`text-center p5 secondary-disabled column-approved ${
            row.getValue("email_verified_at")
              ? "column-approved-primary"
              : "column-approved-disable"
          }`}
        >
          {row.getValue("email_verified_at") ? "Verified" : "Pending"}
        </div>
      ),
    },
    {
      accessorKey: "created_at",
      header: () => (
        <div className="text-left header__4 secondary flex items-center">
          Created at
        </div>
      ),
      cell: ({ row }) => {
        const date = formatDateTime(row.getValue("created_at"));
        return <div className="text-left p5 secondary-disabled">{date}</div>;
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const data = row.original;

        return (
          <Actions action={data}>
            <DropdownMenuItem className="dropdown-options p4 tertiary">
              Verify
            </DropdownMenuItem>
            <DropdownMenuItem className="dropdown-options p4 tertiary">
              Disable
            </DropdownMenuItem>
            <DropdownMenuItem
              className="dropdown-options p4 tertiary"
              onClick={() => {
                setData(data);
                setName("retailer");
                setOpen(true);
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
        getData={() => getUsersByRole("retailer")}
        columns={vendorColumn}
        filter={"name"}
      />
    </div>
  );
};

VendorTable.propTypes = {
  setOpen: PropTypes.any,
  setData: PropTypes.any,
  setName: PropTypes.any,
};
export default VendorTable;
