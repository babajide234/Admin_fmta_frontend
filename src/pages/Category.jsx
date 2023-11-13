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
      return response;
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
      return response.data;
    }, {
    enabled: catId !== ''
  }
  );
  return (
    <main className="dashCategories">
      <div className="dashCategories__div-container">
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
                <div className="dashCategories__scroll">
                  <DashSubCat
                    variant="outline"
                    subCategoryData={subCatData}
                    subCatLoading={subCatLoading}
                    catId={catId}
                  />
                </div>
              </BorderContainer>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Category;
