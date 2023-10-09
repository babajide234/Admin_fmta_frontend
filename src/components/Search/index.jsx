// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import Search from "../../assets/img/search.svg";
import productSlice from "../../store/productStore";
import { useQuery } from "react-query";
import PropTypes from "prop-types";
import BuyDropdown from "../BuyDropdown";

const Searchbar = ({ productArray, setProductArray }) => {
  const [open, setOpen] = useState(true);
  const [searchTerm, setSearch] = useState("");
  const searchProduct = productSlice((state) => state.search);
  const result = productSlice((state) => state.result);

  //   const btnDisabled = searchTerm != "" ? false : true;
  const searchHandler = () => {
    setOpen(!open);
  };

  useEffect(() => {
    window.addEventListener("click", () => setOpen(false));
    // console.log(result);
  }, [open, result]);

  useQuery(["search", searchTerm], async () => {
    const response = await searchProduct(searchTerm, 5);
    console.log(response);
    return response.data;
  });

  const handleSearch = (value) => {
    setSearch(value);
  };

  return (
    <div className="search__form">
      <div className="input">
        <div className="input__icon">
          <img src={Search} alt="" className="" />
        </div>
        <input
          type="text"
          className="input__field"
          placeholder="Search for products"
          onClick={searchHandler}
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
        />

        {result != null && (
          <div className="input__dropdown">
            {result?.map(
              (item, index) =>
                item.category !== null && (
                  <BuyDropdown
                    key={index}
                    name={item?.name}
                    image={item?.image_url}
                    category={item?.category.name}
                    subcategory=""
                    onClick={() => {
                      setProductArray([...productArray, item]);
                    }}
                  />
                )
            )}
          </div>
        )}
      </div>
    </div>
  );
};

Searchbar.propTypes = {
  setProductArray: PropTypes.func,
  productArray: PropTypes.array,
};
export default Searchbar;
