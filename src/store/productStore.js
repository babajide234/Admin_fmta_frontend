import { create } from "zustand";
import { instance } from "../util/request";
import loaderSlice from "./loaderStore";

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
      loaderSlice.setState({ loader: true });
      const response = await instance.post(`products/edit/${id}`, data);
      return response.data;
    } catch (error) {
      return error;
    } finally {
      loaderSlice.setState({ loader: false });
    }
  },
  activateProduct: async (id) => {
    try {
      loaderSlice.setState({ loader: true });
      const response = await instance.post(`products/activate/${id}`);
      return response.data.data;
    } catch (error) {
      return error;
    } finally {
      loaderSlice.setState({ loader: false });
    }
  },
  deactivateProduct: async (id) => {
    try {
      loaderSlice.setState({ loader: true });
      const response = await instance.post(`products/deactivate/${id}`);
      return response.data.data;
    } catch (error) {
      return error;
    } finally {
      loaderSlice.setState({ loader: false });
    }
  },
  createProduct: async (data) => {
    try {
      loaderSlice.setState({ loader: true });
      const response = await instance.post(`products/create`, data);
      // console.log(response);
      return response.data;
    } catch (error) {
      return error;
    } finally {
      loaderSlice.setState({ loader: false });
    }
  },
}));
export default productSlice;
