// eslint-disable-next-line no-unused-vars
import React from "react";
import { ArrowUpDown } from "lucide-react";
import { formatDateTime } from "../../../util/util";
import CurrencyFormat from "react-currency-format";
import Actions from "../../common/Actions";
import { DropdownMenuItem } from "../../../ui/dropdown-menu";

const orderColumn = [
  
  {
    accessorKey: "orderId",
    header: ({ column }) => (
      <div
        className="text-left header__4 secondary flex items-center"
        onClick={() => column.toggleSorting(column.getisSorted() === "asc")}
      >
        Order Id
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className="text-left p5 secondary-disabled">
          {row.getValue("orderId")}
        </div>
      );
    },
  },
  {
    accessorKey: "created",
    header: ({ column }) => (
      <div
        className="text-left header__4 secondary flex items-center"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Created
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </div>
    ),
    cell: ({ row }) => {
      const date = formatDateTime(row.getValue("created"));
      return <div className="text-left p5 secondary-disabled">{date}</div>;
    },
  },
  {
    accessorKey: "customer",
    header: () => (
      <div className="text-left header__4 secondary capitalize">customer</div>
    ),
    cell: ({ row }) => {
      return (
        <div className="text-left p5 secondary capitalize">
          {row.getValue("customer")}
        </div>
      );
    },
  },
  {
    accessorKey: "total",
    header: () => (
      <div className="text-left header__4 secondary capitalize">total</div>
    ),
    cell: ({ row }) => {
      return (
        <CurrencyFormat
          value={row.getValue("total")}
          displayType={"text"}
          thousandSeparator={true}
          prefix={"₦"}
          className="text-left p5 secondary-disabled"
        />
      );
    },
  },
  {
    accessorKey: "payment",
    header: ({ column }) => (
      <div
        className="text-left header__4 secondary flex items-center"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Payment
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div
          className={`text-center p5 secondary-disabled column-approved capitalize ${
            row.getValue('payment').toLowerCase() === "paid"
              ? "column-approved-primary"
              : "column-approved-disable"
          }`}
        >
          {row.getValue("payment")}
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <div
        className="text-left header__4 secondary flex items-center capitalize"
        onClick={() => !column.toggleSorting(column.getIsSorted() === "asc")}
      >
        status
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div
          className={`text-center p5 secondary-disabled column-approved capitalize ${
            row.getValue("status").toLowerCase() === "delivery done"
              ? "column-approved-primary"
              : "column-approved-disable"
          }`}
        >
          {row.getValue("status")}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const action = row.original;

      return (
        <Actions action={action}>
          <DropdownMenuItem className="dropdown-options p4 tertiary">
            View Invoice
          </DropdownMenuItem>
          <DropdownMenuItem className="dropdown-options p4 tertiary">
            Mark Paid
          </DropdownMenuItem>
          <DropdownMenuItem className="dropdown-options p4 tertiary">
            Delivery Done
          </DropdownMenuItem>
          
        </Actions>
      );
    },
  },
];

export default orderColumn;
