import { create } from "zustand";
import { instance, uploadinstance } from "../util/request";

const initialState = {
  coountry: null,
  state: null,
  city: null,
};

const miscSlice = create((set) => ({
  ...initialState,
  imgUpload: async (image) => {
    try {
      const response = await uploadinstance.post("misc/upload-image", image);
      return response;
    } catch (error) {
      return error;
    }
  },
  getCountry: async () => {
    try {
      const response = await instance.get("misc/countries");
      set((state) => ({ ...state, country: response.data.data }));
      return response.data.data;
    } catch (error) {
      return error;
    }
  },
  getState: async (countryCode) => {
    try {
      const ct = countryCode == undefined ? "NG" : countryCode;
      const response = await instance.get(`misc/states/${ct}`);
      set((state) => ({ ...state, state: response.data.data }));
      return response.data.data;
    } catch (error) {
      return error;
    }
  },
  getCity: async (stateCode) => {
    try {
      const response = await instance.get(`misc/cities/NG/${stateCode}`);
      set((state) => ({ ...state, city: response.data.data }));
      return response.data.data;
    } catch (error) {
      return error;
    }
  },
}));

export default miscSlice;
