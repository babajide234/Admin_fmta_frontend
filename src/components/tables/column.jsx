//eslint-disable-next-line no-unused-vars
import React from "react";
//import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "../../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { ArrowUpDown } from "lucide-react";
import { formatDateTime } from "../../util/util";
import { Checkbox } from "../../ui/checkbox"
import CurrencyFormat from "react-currency-format";

const columns = [
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
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
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
    accessorKey: "price",
    header: () => <div className="text-left header__4 secondary">Price</div>,
    cell: ({ row }) => {
      // const amount = parseFloat(row.getValue("price"));
      // const formatted = new Intl.NumberFormat("en-US", {
      //   style: "currency",
      //   currency: "NGN",
      // }).format(amount);

      // return <div className="text-left p5 secondary-disabled">{formatted}</div>;
      return (
        <CurrencyFormat
          value={row.getValue("price")}
          displayType={"text"}
          thousandSeparator={true}
          prefix={"₦"}
          className="text-left p5 secondary-disabled"
        />
      );
    },
  },

  {
    accessorKey: "vendor",
    header: () => (
      <div className="text-left header__4 secondary">Vendor Name</div>
    ),
    cell: ({ row }) => {
      return (
        <div className="text-left p5 secondary capitalize">
          {row.getValue("vendor")}
        </div>
      );
    },
  },
  {
    accessorKey: "type",
    header: ({ column }) => (
      <div
        className="text-left header__4 secondary flex items-center"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Type
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className="text-left p5 secondary-disabled capitalize">
          {row.getValue("type")}
        </div>
      );
    },
  },
  {
    accessorKey: "date",
    header: ({ column }) => (
      <div
        className="text-left header__4 secondary flex items-center"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Date Created
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </div>
    ),
    cell: ({ row }) => {
      const date = formatDateTime(row.getValue("date"));
      return <div className="text-left p5 secondary-disabled">{date}</div>;
    },
  },
  {
    accessorKey: "approved",
    header: ({ column }) => (
      <div
        className="text-left header__4 secondary flex items-center"
        onClick={() => !column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Approved
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div
          className={`text-center p5 secondary-disabled column-approved ${
            row.getValue("approved") === "approved"
              ? "column-approved-primary"
              : "column-approved-disable"
          }`}
        >
          {row.getValue("approved")}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const action = row.original;

      return (
        <DropdownMenu >
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
              onClick={() => navigator.clipboard.writeText(action.id)}
            ></DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="dropdown-options p4 tertiary">
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem className="dropdown-options p4 tertiary">
              Delete
            </DropdownMenuItem>
            <DropdownMenuItem className="dropdown-options p4 tertiary">
              Approve
            </DropdownMenuItem>
            <DropdownMenuItem className="dropdown-options p4 tertiary">
              Details
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default columns;
