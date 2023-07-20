import { create } from "zustand";
import { instance } from "../util/request";

const roleSlice = create(() => ({
  getUsersByRole: async (role) => {
    try {
      const response = await instance.get(`users/role/${role}`);
      return response.data.data;
    } catch (error) {
      return error;
    }
  },
  getRoles: async () => {
    try {
      const response = await instance.get("users/role");
      return response.data.data;
    } catch (error) {
      return error;
    }
  },
}));
export default roleSlice;
