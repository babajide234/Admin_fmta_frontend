import { create } from "zustand";
import { instance } from "../util/request";
import loaderSlice from "./loaderStore";

const initialState = {
  category: null,
  subCategory: null,
  products: null,
  product: null,
  result: null,
};
const productSlice = create((set, get) => ({
  ...initialState,
  search: async (query, limit) => {
    try {
      const li = limit == undefined ? "" : limit;
      const response = await instance.get(
        `products/search?q=${query}&limit=${li}`
      );
      set((state) => ({ ...state, result: response.data.data }));
      return response.data;
    } catch (error) {
      set((state) => ({ ...state, result: null }));
      return error;
    }
  },
  getCategoryName: async () => {
    try {
      const response = await instance.get("category");
      console.log('getCategoryName', response)
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
  getProductById: async (id) => {
    try {
      loaderSlice.setState({ loader: true });
      const response = await instance.get(`products/${id}`);
      set((state) => ({ ...state, product: response.data.data }));
      return response.data.data;
    } catch (error) {
      return error;
    } finally {
      loaderSlice.setState({ loader: false });
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
      get().getProducts();
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
      get().getProducts();
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
      get().getProducts();
      return response.data;
    } catch (error) {
      return error;
    } finally {
      loaderSlice.setState({ loader: false });
    }
  },
  changePrice: async (id, data) => {
    try {
      loaderSlice.setState({ loader: true });
      const response = await instance.post(`products/price/${id}`, data);
      console.log(response);
      return response.data;
    } catch (error) {
      return error;
    } finally {
      loaderSlice.setState({ loader: false });
    }
  },
}));
export default productSlice;
