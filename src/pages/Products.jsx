//eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import Table from "../components/tables/table";
import DashHeader from "../components/Dash/DashHeader";
import { Buttons } from "../components/buttons/Buttons";
import { iconStyle } from "../util/util";
import { ReactComponent as Box } from "../assets/main/icon/box3.svg";
import DashAddProduct from "../components/Dash/DashAddProduct";
import productSlice from "../store/productStore";
import { ArrowUpDown } from "lucide-react";
import { formatDateTime } from "../util/util";
import { Checkbox } from "../ui/checkbox";
import CurrencyFormat from "react-currency-format";
import Actions from "../components/common/Actions";
import { DropdownMenuItem } from "../ui/dropdown-menu";

const Products = () => {
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [prod, setProd] = useState({});
  const getProducts = productSlice.getState().getProducts;

  const handleEditClick = () => {
    setEdit(true);
  };
  const handleOpenClick = () => {
    setOpen(true);
  };
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
          <div className="text-left header__5 secondary-disabled">
            {row.getValue("name")}
          </div>
        );
      },
    },
    {
      accessorKey: "price",
      header: () => <div className="text-left header__4 secondary">Price</div>,
      cell: ({ row }) => {
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
      accessorKey: "user",
      header: () => (
        <div className="text-left header__4 secondary">Vendor Name</div>
      ),
      cell: ({ row }) => {
        const vendor = row.original.user.name;
        return (
          <div className="text-left header__5 secondary-disabled capitalize">
            {vendor}
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
      accessorKey: "created_at",
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
        const date = formatDateTime(row.getValue("created_at"));
        return <div className="text-left p5 secondary-disabled">{date}</div>;
      },
    },
    {
      accessorKey: "status",
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
        const approved = row.getValue("status") === "1" ? true : false;
        return (
          <div
            className={`text-center p5 secondary-disabled column-approved ${
              approved ? "column-approved-primary" : "column-approved-disable"
            }`}
          >
            {approved ? "Approved" : "Waiting"}
          </div>
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const action = row.original;
        const product = row.original;
        return (
          <Actions action={action}>
            <DropdownMenuItem
              className="dropdown-options p4 tertiary"
              onClick={() => {
                setProd(product);
                handleEditClick();
              }}
            >
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
          </Actions>
        );
      },
    },
  ];

  

  return (
    <>
      {edit && (
        <div>
          <DashAddProduct
            goBack={() => setEdit(false)}
            edit={edit}
            data={prod}
          />
        </div>
      )}
      {open && <DashAddProduct goBack={() => setOpen(false)} />}
      {!edit && !open && (
        <div className="dashboardProduct__div-container">
          <div className="dashboardProduct__div-header flex justify-between items-center">
            <DashHeader text="Products" />
            <div className="dashboardProduct__btn">
              <div className="dashboardProduct__btn-container">
                <Buttons
                  color={"secondary"}
                  type={"btn"}
                  style={{ whiteSpace: "nowrap" }}
                  onClick={handleOpenClick}
                >
                  <Box style={iconStyle} />
                  Add a product
                </Buttons>
              </div>
            </div>
          </div>
          <Table getData={getProducts} columns={columns} filter={"name"} />
        </div>
      )}
    </>
  );
};

export default Products;
