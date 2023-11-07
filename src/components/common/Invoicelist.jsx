// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Checkbox } from "../../ui/checkbox";
import { ArrowUpDown } from "lucide-react";
import Actions from "./Actions";
import { DropdownMenuItem } from "../../ui/dropdown-menu";
import Table from '../../components/tables/table'
import { Buttons } from "../buttons/Buttons";

const Invoicelist = ({ setFieldValue, submitForm, list }) => {


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
          Description
          <ArrowUpDown className="ml-2 h-4 w-4 cursor-pointer" />
        </div>
      ),
      cell: ({ row }) => {
        const name = row.original.productName
        return (
          <div className="text-left header__4 secondary-disabled">
            {name}
          </div>
        );
      },
    },
    {
      accessorKey: "unit",
      header: () => (
        <div className="text-left header__4 secondary capitalize">Unit Price (N)</div>
      ),
      cell: ({ row }) => {
        const unit = row.original.productPrice
        return (
          <div className="text-left header__5 secondary-disabled capitalize">
            {unit}
          </div>
        );
      },
    },
    {
      accessorKey: "quantity",
      header: () => <div className="text-left header__4 secondary">Quantity</div>,
      cell: ({ row }) => {
        const quantity = row.original.productQuantity
        return (
          <div className="text-left header__4 secondary-disabled">
            {quantity}
          </div>
        );
      },
    },
    {
      accessorKey: "total",
      header: () => (
        <div
          className="text-left header__4 secondary flex items-center capitalize"
        >
          Total Price (N)
        </div>
      ),
      cell: ({ row }) => {
        const quantity = row.original.productQuantity
        const unit = row.original.productPrice
        const total = (quantity && unit) && quantity * unit
        return (
          <div className="text-left header__4 secondary-disabled">
            {total}
          </div>
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const data = row.original
        const id = data.id
        return (
          <Actions>
            <DropdownMenuItem
              className="dropdown-options p4 tertiary"
              onClick={() => deleteHandler(id)}
            >
              Delete
            </DropdownMenuItem>
          </Actions>
        );
      },
    },
  ];

  const deleteHandler = (id) => {
    const newList = list.filter((list) => list.id !== id)
    setFieldValue('list', [...newList])
  }

  return (
    <section className="invoiceList mt-4">
      <Table columns={columns} data={list} filter={'name'} />
      <div className="my-8 grid grid-cols-3 gap-4 ">
        <div className="col-span-1">
          <Buttons
            color={'primary'}
            type={'btn'}
            onClick={(e) => {
              submitForm();
              e.preventDefault();
            }}>
            Generate Invoice
          </Buttons>
        </div>
      </div>
    </section>
  );
};

Invoicelist.propTypes = {
  list: PropTypes.array,
  setFieldValue: PropTypes.func,
  submitForm: PropTypes.func,
  invoiceArray: PropTypes.array,
  // setInvoiceArray: PropTypes.func
};

export default Invoicelist;
