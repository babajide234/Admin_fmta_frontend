// eslint-disable-next-line no-unused-vars
import React from "react";
import { ArrowUpDown } from "lucide-react";
import { Checkbox } from "../../../ui/checkbox";
import Actions from "../../common/Actions";
import { DropdownMenuItem } from "../../../ui/dropdown-menu";
import { formatDateTime } from "../../../util/util";

const manufacturerColumn = [
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
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className="text-left p5 secondary capitalize">
          {row.getValue("store")}
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
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className="text-left p5 secondary-disabled">
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
    accessorKey: "role",
    header: ({ column }) => (
      <div
        className="text-left header__4 secondary flex items-center"
        onClick={() => column.toggleSorting(column.getisSorted() === "asc")}
      >
        Role
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </div>
    ),
    cell: ({ row }) => (
      <div className="text-left p5 secondary-disabled">
        {row.getValue("role")}
      </div>
    ),
  },
  {
    accessorKey: "approved",
    header: ({ column }) => (
      <div
        className="text-left header__4 secondary flex items-center"
        onClick={() => column.toggleSorting(column.getisSorted() === "asc")}
      >
        Approved
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </div>
    ),
    cell: ({ row }) => (
      <div
        className={`text-center p5 secondary-disabled column-approved ${
          row.getValue("approved") === "approved"
            ? "column-approved-primary"
            : "column-approved-disable"
        }`}
      >
        {row.getValue("approved")}
      </div>
    ),
  },
  {
    accessorKey: "timestamp",
    header: () => (
      <div className="text-left header__4 secondary flex items-center">
        Created at
      </div>
    ),
    cell: ({ row }) => {
      const date = formatDateTime(row.getValue("timestamp"));
      return <div className="text-left p5 secondary-disabled">{date}</div>;
    },
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
          <DropdownMenuItem className="dropdown-options p4 tertiary">
            Details
          </DropdownMenuItem>
        </Actions>
      );
    },
  },
];

export default manufacturerColumn;
