import { create } from "zustand";

const loaderSlice = create((set, get) => ({
  loader: false,
  setLoader: (value) => set({ loader: value }),
}));

export default loaderSlice;
