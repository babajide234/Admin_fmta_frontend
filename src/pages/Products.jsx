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
import Details from "../components/Product/Details";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import SuccessModal from "../components/Modal/SucessModal";
import FailedModal from "../components/Modal/FailedModal";
import Modal from "../components/Modal/Modal";
import ChangePrice from "../components/Product/ChangePrice";

const Products = () => {
  const [add, setAdd] = useState(false);
  const [openPrice, setOpenPrice] = useState(false);
  const [edit, setEdit] = useState(false);
  const [details, setDetails] = useState(false);
  const [prod, setProd] = useState({});
  const [success, setSuccess] = useState(false);
  const [failed, setFailed] = useState(false);
  const getProducts = productSlice.getState().getProducts;
  const activateProduct = productSlice.getState().activateProduct;
  const deactivateProduct = productSlice.getState().deactivateProduct;
  const getProductById = productSlice((state) => state.getProductById);

  const handleAdd = () => {
    setAdd(true);
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
          <ArrowUpDown className="ml-2 h-4 w-4 cursor-pointer" />
        </div>
      ),
      cell: ({ row }) => {
        return (
          <div className="text-left header__4 secondary-disabled">
            {row.getValue("name")}
          </div>
        );
      },
    },
    {
      accessorKey: "price",
      header: () => <div className="text-left header__4 secondary">Price</div>,
      cell: ({ row }) => {
        const data = row.original;
        return (
          <>
            <div className="flex items-center gap-2 mb-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="header__5 secondary">
                    C.P
                  </TooltipTrigger>
                  <TooltipContent className="backg-accent">
                    <p className="p4 secondary">Cost Price</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <CurrencyFormat
                value={row.getValue("price")}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"₦"}
                className="text-left p5 secondary-disabled"
              />
            </div>
            <div className="flex items-center gap-2 mb-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="header__5 secondary">
                    S.P
                  </TooltipTrigger>
                  <TooltipContent className="backg-accent">
                    <p className="p4 secondary">Selling Price</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <CurrencyFormat
                value={data.price_with_markup}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"₦"}
                className="text-left p5 secondary-disabled"
              />
            </div>
            <div className="flex items-center gap-2 mb-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="header__5 secondary">
                    VAT
                  </TooltipTrigger>
                  <TooltipContent className="backg-accent">
                    <p className="p4 secondary">Value Added Tax</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <CurrencyFormat
                value={data.vat}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"₦"}
                className="text-left p5 secondary-disabled"
              />
            </div>
            <div className="flex items-center gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="header__5 secondary">
                    T.P
                  </TooltipTrigger>
                  <TooltipContent className="backg-accent">
                    <p className="p4 secondary">Total Price</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <CurrencyFormat
                value={data.total_price}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"₦"}
                className="text-left p5 secondary-disabled"
              />
            </div>
          </>
        );
      },
    },
    {
      accessorKey: "org_name",
      header: () => (
        <div className="text-left header__4 secondary">Vendor Name</div>
      ),
      cell: ({ row }) => {
        const vendor = row.original.user.meta.org_name;
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
          <ArrowUpDown className="ml-2 h-4 w-4 cursor-pointer" />
        </div>
      ),
      cell: ({ row }) => {
        const type = row.original.user.meta.org_type;
        return (
          <div className="text-left p5 secondary-disabled capitalize">
            {type}
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
          <ArrowUpDown className="ml-2 h-4 w-4 cursor-pointer" />
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
          <ArrowUpDown className="ml-2 h-4 w-4 cursor-pointer" />
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
            {approved ? "Approved" : "Pending"}
          </div>
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const action = row.original;
        const product = row.original;
        const productId = row.original.id;
        const status = row.original.status;
        return (
          <Actions action={action}>
            <DropdownMenuItem
              className="dropdown-options p4 tertiary"
              onClick={() => {
                handleEdit(productId);
              }}
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              className="dropdown-options p4 tertiary"
              onClick={() => {
                handlePrice(productId);
              }}
            >
              Change price
            </DropdownMenuItem>
            <DropdownMenuItem
              className="dropdown-options p4 tertiary"
              onClick={() => {
                if (status === "1") {
                  deactivateProduct(productId);
                } else {
                  activateProduct(productId);
                }
              }}
            >
              {status === "1" ? "Disapprove" : "Approve"}
            </DropdownMenuItem>
            <DropdownMenuItem
              className="dropdown-options p4 tertiary"
              onClick={() => {
                setProd(product);
                setDetails(!details);
              }}
            >
              Details
            </DropdownMenuItem>
            <DropdownMenuItem className="dropdown-options p4 tertiary">
              Delete
            </DropdownMenuItem>
          </Actions>
        );
      },
    },
  ];

  const handleEdit = (id) => {
    setEdit(true);
    getProductById(id);
  };

  const handlePrice = (id) => {
    setOpenPrice(!openPrice);
    getProductById(id);
  };

  return (
    <>
      {edit && (
        <DashAddProduct
          goBack={() => setEdit(!edit)}
          edit={edit}
          prod={prod}
          success={success}
          setSuccess={setSuccess}
          failed={failed}
          setFailed={setFailed}
        />
      )}
      {add && (
        <DashAddProduct
          goBack={() => setAdd(!add)}
          success={success}
          setSuccess={setSuccess}
          failed={failed}
          setFailed={setFailed}
        />
      )}
      {details && <Details data={prod} goBack={() => setDetails(!details)} />}
      {!edit && !add && !details && (
        <div className="dashboardProduct__div-container">
          <div className="dashboardProduct__div-header flex justify-between items-center">
            <DashHeader text="Products" />
            <div className="dashboardProduct__btn">
              <div className="dashboardProduct__btn-container">
                <Buttons
                  color={"secondary"}
                  type={"btn"}
                  style={{ whiteSpace: "nowrap" }}
                  onClick={handleAdd}
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
      {openPrice && (
        <Modal
          open={openPrice}
          close={() => setOpenPrice(!openPrice)}
          loading={true}
        >
          <ChangePrice close={() => setOpenPrice(!openPrice)} />
        </Modal>
      )}
      {success && (
        <SuccessModal
          open={success}
          close={() => setSuccess(!success)}
          loading={true}
          text={`${edit ? "Product edited " : "Product created "}`}
        ></SuccessModal>
      )}
      {failed && (
        <FailedModal
          open={failed}
          close={() => setFailed(!failed)}
          loading={true}
          header={"failed"}
          text={`${edit ? "Product edit failed" : "Create product failed "}`}
        ></FailedModal>
      )}
    </>
  );
};

export default Products;
