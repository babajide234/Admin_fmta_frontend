import { create} from "zustand";
import { instance } from "../util/request";

const initialState = {
  category: null,
  subCategory: null,
  products: null,
};
const productSlice = create((set) => ({
  ...initialState,
  getCategoryName: async () => {
    try {
      const response = await instance.get("category");
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
  getProducts: async () => {
    try {
      const response = await instance.get("products");
      set((state) => ({ ...state, products: response.data.data }));
      return response.data.data;
    } catch (error) {
      return error;
    }
  },
  editProduct: async (id, data) => {
    try {
      const response = await instance.post(`products/edit/${id}`, data);
      return response.data.data;
    } catch (error) {
      return error;
    }
  },
  activateProduct: async (id) => {
    try {
      const response = await instance.post(`products/activate/${id}`);
      return response.data.data;
    } catch (error) {
      return error;
    }
  },
  deactivateProduct: async (id) => {
    try {
      const response = await instance.post(`products/deactivate/${id}`);
      return response.data.data;
    } catch (error) {
      return error;
    }
  },
  createProduct: async (data) => {
    try {
      const response = await instance.post(`products/create`, data);
      return response.data.data;
    } catch (error) {
      return error;
    }
  },
}));
export default productSlice;
