// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import DashHeader from "../components/Dash/DashHeader";
import { Buttons } from "../components/buttons/Buttons";
import { ReactComponent as Box } from "../assets/main/icon/box3.svg";
import { iconStyle } from "../util/util";
import Table from "../components/tables/table";
import DashCreateOrder from "../components/Dash/DashCreateOrder";
import { ArrowUpDown } from "lucide-react";
import { formatDateTime } from "../util/util";
import CurrencyFormat from "react-currency-format";
import Actions from "../components/common/Actions";
import { DropdownMenuItem } from "../ui/dropdown-menu";

const data = [
  {
    orderId: "FM0611",
    created: "2021-01-05 11:50:10",
    payment: "Paid",
    customer: "Jude Joshua",
    total: 1120,
    status: "Delivery Done",
  },
  {
    orderId: "FM0631",
    created: "2021-04-07 11:50:10",
    payment: "Pending",
    customer: "Jude Joshua",
    total: 1120,
    status: "Awaiting Confirmation",
  },
  {
    orderId: "FM06141",
    created: "2023-07-19 16:47:47",
    payment: "Paid",
    customer: "Jude Joe",
    total: 1120,
    status: "Delivery Done",
  },
  {
    orderId: "FM0612",
    created: "2021-07-19 16:47:47",
    payment: "pending",
    customer: "Jude Joshua",
    total: 1120,
    status: "Awaiting Confirmation",
  },
  {
    orderId: "FM0610",
    created: "2021-01-07 11:50:10",
    payment: "Paid",
    customer: "JPrincess Uzoukwu",
    total: 1120,
    status: "Awaiting Confirmation",
  },
];

const Orders = () => {
  const [open, setOpen] = useState(false);

  const clickHandler = () => {
    setOpen(() => !open);
  };

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
              row.getValue("payment").toLowerCase() === "paid"
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

  return (
    <main className="dashOrders">
      
      <div className="dashOrders__div-container">
        {open ? (
          <DashCreateOrder goBack={clickHandler} />
        ) : (
          <>
            <div className="dashOrders__div-header flex justify-between items-center">
              <DashHeader text={"Orders"} />
              <div className="dashboardProduct__btn">
                <div className="dashboardProduct__btn-container">
                  <Buttons
                    color={"secondary"}
                    type={"btn"}
                    style={{ whiteSpace: "nowrap" }}
                    onClick={clickHandler}
                  >
                    <Box style={iconStyle} />
                    Create an Order
                  </Buttons>
                </div>
              </div>
            </div>
            <Table columns={orderColumn} data={data} filter={"orderId"} />
          </>
        )}
      </div>
    </main>
  );
};

export default Orders;
