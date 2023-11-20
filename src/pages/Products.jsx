//eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import Table from "../components/tables/table";
import DashHeader from "../components/Dash/DashHeader";
import { Buttons } from "../components/buttons/Buttons";
import { adminRoles, iconStyle } from "../util/util";
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
import { useQuery } from "react-query";
import userSlice from "../store/userStore";
// import { useLoaderData } from "react-router-dom";

const Products = () => {
  const [add, setAdd] = useState(false);
  const [openPrice, setOpenPrice] = useState(false);
  const [edit, setEdit] = useState(false);
  const [details, setDetails] = useState(false);
  const [successPrice, setSuccessPrice] = useState(false);
  const [failedPrice, setFailedPrice] = useState(false);
  const [prod, setProd] = useState({});
  const [success, setSuccess] = useState(false);
  const [failed, setFailed] = useState(false);
  const getProducts = productSlice.getState().getProducts;
  const activateProduct = productSlice.getState().activateProduct;
  const deactivateProduct = productSlice.getState().deactivateProduct;
  const getProductById = productSlice((state) => state.getProductById);

  const role = userSlice.getState().role

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
        const price = data?.price;
        const currency = data.currency;
        return (
          <>
            <div className="mb-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="flex gap-2 items-start">
                    <span className="header__5 secondary">C.P</span>
                    <CurrencyFormat
                      value={price.original_price}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={currency === "USD" ? "$" : "₦"}
                      className="text-left p5 secondary-disabled"
                    />
                  </TooltipTrigger>
                  <TooltipContent className="backg-accent">
                    <p className="p4 secondary">Cost Price ({currency})</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            {price.converted_price && (
              <div className="mb-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger className="flex gap-2 items-start">
                      <span className="header__5 secondary">C.P.C</span>
                      <CurrencyFormat
                        value={price.converted_price}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"₦"}
                        className="text-left p5 secondary-disabled"
                      />
                    </TooltipTrigger>
                    <TooltipContent className="backg-accent">
                      <p className="p4 secondary">Cost Price Converted (NGN)</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            )}
            <div className=" mb-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="flex gap-2 items-start">
                    <span className="header__5 secondary">S.P</span>
                    <CurrencyFormat
                      value={data.price_with_markup}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"₦"}
                      className="text-left p5 secondary-disabled"
                    />
                  </TooltipTrigger>
                  <TooltipContent className="backg-accent">
                    <p className="p4 secondary">Selling Price (NGN)</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="mb-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="flex gap-2 items-start">
                    <span className="header__5 secondary">VAT</span>
                    <CurrencyFormat
                      value={data.vat}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"₦"}
                      className="text-left p5 secondary-disabled"
                    />
                  </TooltipTrigger>
                  <TooltipContent className="backg-accent">
                    <p className="p4 secondary">Value Added Tax (NGN)</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="flex gap-2 items-start">
                    <span className="header__5 secondary">T.P</span>
                    <CurrencyFormat
                      value={data.total_price}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"₦"}
                      className="text-left p5 secondary-disabled"
                    />
                  </TooltipTrigger>
                  <TooltipContent className="backg-accent">
                    <p className="p4 secondary">Total Price (NGN)</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
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
            className={`text-center p5 secondary-disabled column-approved ${approved ? "column-approved-primary" : "column-approved-disable"
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
        const product = row.original;
        const productId = row.original.id;
        const status = row.original.status;
        return (
          <Actions>
            {adminRoles.includes(role) && <DropdownMenuItem
              className="dropdown-options p4 tertiary"
              onClick={() => {
                handleEdit(productId);
              }}
            >
              Edit
            </DropdownMenuItem>}
            {role !== 'marketing' && <DropdownMenuItem
              className="dropdown-options p4 tertiary"
              onClick={() => {
                handlePrice(productId);
              }}
            >
              Change price
            </DropdownMenuItem>}

            {adminRoles.includes(role) && <DropdownMenuItem
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
            }
            <DropdownMenuItem
              className="dropdown-options p4 tertiary"
              onClick={() => {
                setProd(product);
                handleDetails(productId);
              }}
            >
              Details
            </DropdownMenuItem>
            {adminRoles.includes(role) && <DropdownMenuItem className="dropdown-options p4 tertiary">
              Delete
            </DropdownMenuItem>}
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

  const handleDetails = (id) => {
    setDetails(!details);
    getProductById(id);
  };

  //get all products api call
  const { data: productData = [], isLoading } = useQuery("getProduct", () =>
    getProducts()
  );

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
          <Table
            columns={columns}
            filter={"name"}
            data={productData}
            isLoading={isLoading}
          />
        </div>
      )}
      {openPrice && (
        <Modal
          open={openPrice}
          close={() => setOpenPrice(!openPrice)}
          loading={true}
        >
          <ChangePrice
            close={() => setOpenPrice(!openPrice)}
            success={successPrice}
            failed={failedPrice}
            setSuccess={setSuccessPrice}
            setFailed={setFailedPrice}
          />
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
          icon={true}
          loading={true}
          header={"failed"}
          text={`${edit ? "Product edit failed" : "Create product failed "}`}
        ></FailedModal>
      )}
      {successPrice && (
        <SuccessModal
          open={successPrice}
          close={() => setSuccessPrice(!successPrice)}
          loading={true}
          text={"Price updated successfully!"}
        ></SuccessModal>
      )}
      {failedPrice && (
        <FailedModal
          open={failedPrice}
          close={() => setFailedPrice(!failedPrice)}
          icon={true}
          loading={true}
          header={"failed"}
          text={"Price update failed!"}
        ></FailedModal>
      )}
    </>
  );
};

export default Products;
