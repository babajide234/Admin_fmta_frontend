// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import DashHeader from "../components/Dash/DashHeader";
import { Buttons } from "../components/buttons/Buttons";
import { adminRoles, iconStyle } from "../util/util";
import Table from "../components/tables/table";
import { ArrowUpDown } from "lucide-react";
import { formatDateTime } from "../util/util";
import CurrencyFormat from "react-currency-format";
import Actions from "../components/common/Actions";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { ListBullets } from "phosphor-react";
import { useQuery } from "react-query";
import orderSlice from "../store/orderStore";
import userSlice from "../store/userStore";


const Orders = () => {
  const getOrders = orderSlice.getState().getOrders
  const role = userSlice.getState().role

  const orderColumn = [
    {
      accessorKey: "order_number",
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
        const data = row.original
        const orderId = data.order_number
        return (
          <div className="text-left p4 secondary">
            {orderId}
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
        const data = row.original;
        const created = data.created_at
        const date = formatDateTime(created);

        return <div className="text-left p5 secondary-disabled">{date}</div>;
      },
    },
    // {
    //   accessorKey: "customer",
    //   header: () => (
    //     <div className="text-left header__4 secondary capitalize">customer</div>
    //   ),
    //   cell: ({ row }) => {
    //     return (
    //       <div className="text-left p5 secondary capitalize">
    //         {row.getValue("customer")}
    //       </div>
    //     );
    //   },
    // },
    {
      accessorKey: "total",
      header: () => (
        <div className="text-left header__4 secondary capitalize">total</div>
      ),
      cell: ({ row }) => {
        const data = row.original
        const amount = data.payment.amount
        return (
          <CurrencyFormat
            value={amount}
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
        const data = row.original
        const status = data.payment.status
        return (
          <div
            className={`text-center p5 secondary-disabled column-approved capitalize ${status.toLowerCase() === "paid"
              ? "column-approved-primary"
              : "column-approved-disable"
              }`}
          >
            {status}
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
        const data = row.original
        const status = data.status
        return (
          <div
            className={`text-center p5 secondary-disabled column-approved capitalize ${status.toLowerCase() === "delivery done"
              ? "column-approved-primary"
              : "column-approved-disable"
              }`}
          >
            {status}
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
              View Order
            </DropdownMenuItem>
            {adminRoles.includes(role) &&
              <>
                <DropdownMenuItem className="dropdown-options p4 tertiary">
                  Mark Paid
                </DropdownMenuItem>
                <DropdownMenuItem className="dropdown-options p4 tertiary">
                  Delivery Done
                </DropdownMenuItem>
              </>
            }
          </Actions >
        );
      },
    },
  ];
  //get all orders api call
  const { data: orderData, isLoading } = useQuery('getAllOrders', () => getOrders())
  return (
    <main className="dashOrders">
      <div className="dashOrders__div-container">
        <div className="dashOrders__div-header flex justify-between items-center">
          <DashHeader text={"Orders"} />
          <div className="flex flex-row gap-3 items-center">
            <div className="dashboardProduct__btn-container">
              <Buttons
                color={"secondary"}
                type={"link"}
                style={{ whiteSpace: "nowrap" }}
                to={'/invoice'}
              >
                <ListBullets style={iconStyle} />
                Generate invoice
              </Buttons>
            </div>
          </div>
        </div>
        <Table columns={orderColumn} data={orderData} filter={"order_number"} isLoading={isLoading} />

      </div>
    </main>
  );
};

export default Orders;
