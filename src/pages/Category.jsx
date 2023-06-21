// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import DashHeader from "../components/Dash/DashHeader";
import BorderContainer from "../components/common/BorderContainer";
import DashCat from "../components/Dash/DashCat";
import DashSubCat from "../components/Dash/DashSubCat";
import productSlice from "../store/productStore";
import { useQuery } from "react-query";

const Category = () => {
  const [catId, setCatId] = useState("");
  const getCategoryName = productSlice.getState().getCategoryName;
  const getSubCategory = productSlice.getState().getSubCategory;

  const { data: catData, isLoading: catLoading } = useQuery(
    "getCategoryName",
    async () => {
      const response = await getCategoryName();
      return response.data;
    }
  );
  const handleCategoryChange = (id) => {
    getSubCategory(id);
    setCatId(id);
  };

  const { data: subCatData, isLoading: subCatLoading } = useQuery(
    ["subcat", catId],
    async () => {
      const response = await getSubCategory(catId);
      console.log(response.data);

      return response.data;
    }
  );
  return (
    <main className="dashCategories">
      <DashHeader text={"Product Categories"} />
      <section className="dashCategories__section-body">
        <div className="dashCategories__div-container grid-2">
          <div>
            <BorderContainer variant="outline">
              <DashCat
                variant="outline"
                catLoading={catLoading}
                catData={catData}
                handleCategoryChange={handleCategoryChange}
              />
            </BorderContainer>
          </div>
          <div>
            <BorderContainer variant="outline">
              <DashSubCat
                variant="outline"
                subCategoryData={subCatData}
                subCatLoading={subCatLoading}
              />
            </BorderContainer>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Category;
