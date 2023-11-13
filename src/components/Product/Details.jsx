// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import DashHeader from "../Dash/DashHeader";
import GoBack from "../GoBack";
import { formatDateTime, getNameById } from "../../util/util";
import sanitizeHtml from "sanitize-html";
import productSlice from "../../store/productStore";
import CurrencyFormat from "react-currency-format";

function cleanString(dirtyString) {
  const parser = new DOMParser();
  const decodedString = parser.parseFromString(dirtyString, "text/html")
    .documentElement.textContent;
  const cleanedString = sanitizeHtml(decodedString);
  return cleanedString;
}
const Details = ({ data, goBack }) => {
  const [cat, setCat] = useState([]);
  const [subCat, setSubCat] = useState([]);
  const getCategoryName = productSlice.getState().getCategoryName;
  const getSubCategory = productSlice.getState().getSubCategory;
  const product = productSlice((state) => state.product);

  //redundant code
  useEffect(() => {
    const fetchData = async () => {
      try {
        const catResponse = await getCategoryName();
        setCat(catResponse.data);

        const subCatResponse = await getSubCategory(data?.category_id);
        setSubCat(subCatResponse.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [data]);

  return (
    <main className="productDetails">
      <GoBack onClick={goBack}>Go back</GoBack>
      <DashHeader text={`Product Details`} />

      <section className="productDetails__section-body">
        <div className="grid grid-cols-5 items-center gap-2 py-2">
          <p className="p4 font-extrabold tertiary col-span-1">Product Name:</p>
          <p className="p4 secondary-disabled col-span-4">
            {product?.name}
          </p>
        </div>
        <div className="grid grid-cols-5 items-center gap-2 py-2">
          <p className="p4 font-extrabold tertiary col-span-1">Product id:</p>
          <p className="p4 secondary-disabled col-span-4">
            {product?.id}
          </p>
        </div>
        <div className="grid grid-cols-5 items-center gap-2 py-2">
          <p className="p4 font-extrabold tertiary col-span-1">Category:</p>
          <p className="p4 secondary-disabled col-span-4">
            {product?.category.name}
          </p>
        </div>
        <div className="grid grid-cols-5 items-center gap-2 py-2">
          <p className="p4 font-extrabold tertiary col-span-1">Sub-category:</p>
          <p className="p4 secondary-disabled col-span-4">
            {getNameById(product?.subcategory_id, subCat)}
          </p>
        </div>

        <div className="grid grid-cols-5 items-center gap-2 py-2">
          <p className="p4 font-extrabold tertiary col-span-1">Price:</p>
          <p className="p4 secondary-disabled col-span-4">

            <CurrencyFormat
              value={product?.price.original_price}
              displayType={"text"}
              thousandSeparator={true}
              prefix={product?.currency === "USD" ? "$" : "₦"}
              className=""
            />

          </p>
        </div>

        <div className="grid grid-cols-5 items-center gap-2 py-2">
          <p className="p4 font-extrabold tertiary col-span-1">Markup price:</p>
          <p className="p4 secondary-disabled col-span-4">
            <CurrencyFormat
              value={product?.markup_price}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"₦"}
              className=""
            />
          </p>
        </div>

        <div className="grid grid-cols-5 items-center gap-2 py-2">
          <p className="p4 font-extrabold tertiary col-span-1">V.A.T:</p>
          <p className="p4 secondary-disabled col-span-4">
            <CurrencyFormat
              value={product?.vat}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"₦"}
              className=""
            />
          </p>
        </div>

        <div className="grid grid-cols-5 items-center gap-2 py-2">
          <p className="p4 font-extrabold tertiary col-span-1">Total price:</p>
          <p className="p4 secondary-disabled col-span-4">

            <CurrencyFormat
              value={product?.price_total}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"₦"}
              className=""
            />
          </p>
        </div>

        <div className="grid grid-cols-5 items-center gap-2 py-2">
          <p className="p4 font-extrabold tertiary col-span-1">
            Minimum Order Quantity:
          </p>
          <p className="p4 secondary-disabled col-span-4">
            {product?.moq}
          </p>
        </div>
        <div className="grid grid-cols-5 items-center gap-2 py-2">
          <p className="p4 font-extrabold tertiary col-span-1">Quantity in Stock:</p>
          <p className="p4 secondary-disabled col-span-4">
            {data?.quantity_in_stock}
          </p>
        </div>
        <div className="grid grid-cols-5 items-center gap-2 py-2">
          <p className="p4 font-extrabold tertiary col-span-1">Status:</p>
          <p className="p4 secondary-disabled col-span-4">
            {data?.status === "1" ? "Approved" : "Pending"}
          </p>
        </div>
        <div className="grid grid-cols-5 items-center gap-2 py-2">
          <p className="p4 font-extrabold tertiary col-span-1">Description:</p>
          <p className="p4 secondary-disabled col-span-4">
            {cleanString(product?.description)}
          </p>
        </div>
        <div className="grid grid-cols-5 items-center gap-2 py-2">
          <p className="p4 font-extrabold tertiary col-span-1">Created at:</p>
          <p className="p4 secondary-disabled col-span-4">
            {formatDateTime(data?.created_at)}
          </p>
        </div>
        <div className="grid grid-cols-5 items-center gap-2 py-2">
          <p className="p4 font-extrabold tertiary col-span-1">
            Retailer&apos;s name:
          </p>
          <p className="p4 secondary-disabled col-span-4">
            {data?.user.name}
          </p>
        </div>
        <div className="grid grid-cols-5 items-center gap-2 py-2">
          <p className="p4 font-extrabold tertiary col-span-1">
            Retailer&apos;s email:
          </p>
          <p className="p4 secondary-disabled col-span-4">
            {data?.user.email}
          </p>
        </div>
        <div className="grid grid-cols-5 items-center gap-2 py-2">
          <p className="p4 font-extrabold tertiary col-span-1">
            Retailer&apos;s phone:
          </p>
          <p className="p4 secondary-disabled col-span-4">
            {data?.user.phone}
          </p>
        </div>
      </section>
    </main>
  );
};
Details.propTypes = {
  goBack: PropTypes.func,
  data: PropTypes.object,
};
export default Details;
