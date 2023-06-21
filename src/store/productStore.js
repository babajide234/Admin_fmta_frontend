import { createStore } from "zustand";
import { instance } from "../util/request";

const initialState = {
  category: null,
  subCategory: null,
};
const productSlice = createStore((set) => ({
  ...initialState,
  getCategoryName: async () => {
    try {
      const response = await instance.get("category");
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
  getSubCategory: async (id) => {
    try {
      const response = await instance.get(`category/subcategory/${id}`);
      set((state) => ({ ...state, subCategory: response.data.data }));
      return response.data;
    } catch (err) {
      console.log(err);
      return err;
    }
  },
}));
export default productSlice;
