import { create } from "zustand";

const loaderSlice = create((set) => ({
  loader: false,
  setLoader: (value) => set({ loader: value }),
}));

export default loaderSlice;
