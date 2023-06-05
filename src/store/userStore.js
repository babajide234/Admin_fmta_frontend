import { create } from "zustand";
import { persist } from "zustand/middleware";
import loaderSlice from "./loaderStore";
import { loginRequest } from "../util/service";
import { instance } from "../util/request";

const initialState = {
  isLoggedIn: false,
  token: "",
  details: null,
  role: "",
};

const userSlice = create(
  persist(
    (set) => ({
      ...initialState,
      login: async (data) => {
        try {
          loaderSlice.setState({ loader: true });
          const response = await loginRequest(data);
          const userData = response.data.data.details;
          const role = response.data.data.details.roles[0].name
            ? response.data.data.details.roles[0].name
            : "customer";
          const accessToken = response.data.data.access_token;

          set((state) => ({ ...state, details: userData }));
          set((state) => ({ ...state, token: accessToken }));
          set((state) => ({ ...state, role: role }));
          set((state) => ({ ...state, isLoggedIn: true }));
          console.log(role);
          return response.data;
        } catch (error) {
          return error;
        } finally {
          loaderSlice.setState({ loader: false });
        }
      },
      register: async (data) => {
        try {
          const response = await instance.post("register", data);
          const userData = response.data.data.user;
          const accessToken = response.data.data.access_token;

          set((state) => ({ ...state, details: userData }));
          set((state) => ({ ...state, token: accessToken }));
          set((state) => ({ ...state, isLoggedIn: true }));
        } catch (error) {
          console.log(error);
          return error;
        }
      },
      registerComplete: async (data) => {
        try {
          const response = await instance.post("register/complete", data);
          return response.data;
        } catch (error) {
          console.log(error);
          return error;
        }
      },
      resetPassword: async (email) => {
        try {
          loaderSlice.setState({ loader: true });
          const response = await instance.post("password/email", email);
          //console.log(response.data)
          return response.data;
        } catch (error) {
          console.log(error);
          return error;
        } finally {
          loaderSlice.setState({ loader: false });
        }
      },
      newPassword: async (password) => {
        try {
          const response = await instance.post("newpassword", password);
          return response.data;
        } catch (error) {
          console.log(error);
        }
      },
      editProfile: async (formdata) => {
        try {
          const response = await instance.post("profile", formdata);
          const userData = response.data.data;
          set((state) => ({ ...state, details: userData }));
          return response.data;
        } catch (error) {
          console.log(error);
        }
      },
      editOrganizationProfile: async (formdata) => {
        try {
          const response = await instance.post("profile/org", formdata);
          return response.data;
        } catch (error) {
          console.log(error);
        }
      },
      logout: async () => {
        try {
          loaderSlice.setState({ loader: true });
          const response = await instance.get("logout");
          // response.then((result) => {
          // });
        } catch (error) {
          console.log(error);
        } finally {
          set(initialState);
          loaderSlice.setState({ loader: false });
        }
      },
    }),
    {
      name: "fmtaAdmin",
    }
  )
);

export default userSlice;

export const addressSlice = create((set) => ({
  address: null,
  hasAddress: async () => {
    try {
      loaderSlice.setState({ loader: true });
      const response = await instance.get("address/has");
      return response.data;
    } catch (error) {
      console.log(error);
    } finally {
      loaderSlice.setState({ loader: false });
    }
  },
  addAddress: async (address) => {
    try {
      loaderSlice.setState({ loader: true });
      const response = await instance.post("address", address);
      return response.data;
    } catch (err) {
      console.log(err);
      return err;
    } finally {
      loaderSlice.setState({ loader: false });
    }
  },
  getAllAddress: async () => {
    try {
      const response = await instance.get("address");
      console.log(response.data);
      set((state) => ({ ...state, address: response.data.data }));
      return response.data.data;
    } catch (err) {
      console.log(err);
      return err;
    }
  },
  getDefaultAddress: async () => {
    try {
      const response = await instance.get("address/default");
      return response.data;
    } catch (err) {
      console.log(err);
      return err;
    }
  },
  setDefaultAddress: async (id) => {
    try {
      loaderSlice.setState({ loader: true });
      const response = await instance.get(`address/default/${id}`);
      return response.data;
    } catch (err) {
      console.log(err);
    } finally {
      loaderSlice.setState({ loader: false });
    }
  },
  updateAddress: async (data, id) => {
    try {
      loaderSlice.setState({ loader: true });
      const response = await instance.post(`address/update/${id}`, data);
      set((state) => ({ ...state, address: response.data.data.address }));
    } catch (err) {
      console.log(err);
    } finally {
      loaderSlice.setState({ loader: false });
    }
  },
  deleteAddress: async (id) => {
    try {
      loaderSlice.setState({ loader: true });
      const response = await instance.get(`address/delete/${id}`);
      return response.data;
    } catch (err) {
      console.log(err);
      return err;
    } finally {
      loaderSlice.setState({ loader: false });
    }
  },
}));
