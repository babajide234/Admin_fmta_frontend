import axios from "axios";
import userSlice from "../store/userStore";

export const instance = axios.create({
  baseURL: "https://apiv2.firstmedtrade.com/api/",
  withCredentials: true,
});

// instance.defaults.headers.common['Cookie'] = getCookie('cart_id');

instance.interceptors.request.use(
  (config) => {
    const token = userSlice.getState().token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      // const cartId = getCookie('cart_id');
      // console.log(cartId);
      // config.headers.Cookie = `cart_id=${cartId}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
