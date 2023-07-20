// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import DashHeader from "../Dash/DashHeader";
import GoBack from "../GoBack";
import { formatDateTime, getNameById } from "../../util/util";
import sanitizeHtml from "sanitize-html";
import productSlice from "../../store/productStore";

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const catResponse = await getCategoryName();
        setCat(catResponse.data);

        const subCatResponse = await getSubCategory(data.category_id);
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
        <div className="flex items-center gap-2 py-2">
          <p className="header__4 ink w-3/12 self-start">Product Name:</p>
          <p className="p4 secondary-disabled w-9/12">{data.name}</p>
        </div>
        <div className="flex items-center gap-2 py-2">
          <p className="header__4 ink w-3/12 self-start">Product id:</p>
          <p className="p4 secondary-disabled w-9/12">{data.id}</p>
        </div>
        <div className="flex items-center gap-2 py-2">
          <p className="header__4 ink w-3/12 self-start">Category:</p>
          <p className="p4 secondary-disabled w-9/12">
            {getNameById(data.category_id, cat)}
          </p>
        </div>
        <div className="flex items-center gap-2 py-2">
          <p className="header__4 ink w-3/12 self-start">Sub-category:</p>
          <p className="p4 secondary-disabled w-9/12">
            {getNameById(data.subcategory_id, subCat)}
          </p>
        </div>
        <div className="flex items-center gap-2 py-2">
          <p className="header__4 ink w-3/12 self-start">Price:</p>
          <p className="p4 secondary-disabled w-9/12">{data.price}</p>
        </div>
        <div className="flex items-center gap-2 py-2">
          <p className="header__4 ink w-3/12 self-start">Currency:</p>
          <p className="p4 secondary-disabled w-9/12">{data.currency}</p>
        </div>
        <div className="flex items-center gap-2 py-2">
          <p className="header__4 ink w-3/12 self-start">
            Minimum Order Quantity:
          </p>
          <p className="p4 secondary-disabled w-9/12">{data.moq}</p>
        </div>
        <div className="flex items-center gap-2 py-2">
          <p className="header__4 ink w-3/12 self-start">Quantity in Stock:</p>
          <p className="p4 secondary-disabled w-9/12">
            {data.quantity_in_stock}
          </p>
        </div>
        <div className="flex items-center gap-2 py-2">
          <p className="header__4 ink w-3/12 self-start">Status:</p>
          <p className="p4 secondary-disabled w-9/12">
            {data.status === "1" ? "Approved" : "Pending"}
          </p>
        </div>
        <div className="flex  items-center gap-2 py-2">
          <p className="header__4 ink w-3/12 self-start">Description:</p>
          <p className="p4 secondary-disabled w-9/12">
            {cleanString(data.description)}
          </p>
        </div>
        <div className="flex items-center gap-2 py-2">
          <p className="header__4 ink w-3/12 self-start">Created at:</p>
          <p className="p4 secondary-disabled w-9/12">
            {formatDateTime(data.created_at)}
          </p>
        </div>
        <div className="flex items-center gap-2 py-2">
          <p className="header__4 ink w-3/12 self-start">Owner&apos;s name:</p>
          <p className="p4 secondary-disabled w-9/12">{data.user.name}</p>
        </div>
        <div className="flex items-center gap-2 py-2">
          <p className="header__4 ink w-3/12 self-start">Owner&apos;s email:</p>
          <p className="p4 secondary-disabled w-9/12">{data.user.email}</p>
        </div>
        <div className="flex items-center gap-2 py-2">
          <p className="header__4 ink w-3/12 self-start">Owner&apos;s phone:</p>
          <p className="p4 secondary-disabled w-9/12">{data.user.phone}</p>
        </div>
      </section>
    </main>
  );
};
Details.propTypes = {
  data: PropTypes.any,
  goBack: PropTypes.func,
};
export default Details;
