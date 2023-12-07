import { createStore } from "zustand";
import { instance } from "../util/request";
import loaderSlice from "./loaderStore";

const initialState = {
  order: null,
  orders: null,
};

const orderSlice = createStore((set) => ({
  ...initialState,
  getSingleOrder: async (id) => {
    try {
      loaderSlice.setState({ loader: true });
      const response = await instance.get(`orders/${id}`);

      set((state) => ({ ...state, order: response.data }));

      return response;
    } catch (error) {
      return error;
    } finally {
      loaderSlice.setState({ loader: false });
    }
  },
  getOrders: async () => {
    try {
      const response = await instance.get("orders");
      set((state) => ({ ...state, orders: response.data }));
      return response.data.data;
    } catch (error) {
      return error;
    }
  },
  createInvoice: async (data) => {
    try {
      loaderSlice.setState({ loader: true });
      const response = await instance.post("invoice", data);
      return response.data.data;
    } catch (error) {
      return error;
    } finally {
      loaderSlice.setState({ loader: false });
    }
  },
}));

export default orderSlice;
