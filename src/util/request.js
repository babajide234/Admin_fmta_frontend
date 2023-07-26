import axios from "axios";
import userSlice from "../store/userStore";

const axiosConfig = {
  baseURL: "https://apiv2.firstmedtrade.com/api/",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  withCredentials: true,
};
export const instance = axios.create(axiosConfig);

export const uploadinstance = axios.create({
  ...axiosConfig,
  headers: {
    ...axiosConfig.headers,
    "Content-Type": "multipart/form-data",
  },
});

const attachAuthToken = (config) => {
  const token = userSlice.getState().token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
};
const redirectToLogin = () => {
  userSlice.getState().logout();
};

const handleUnauthorizedError = (error) => {
  if (error.response && error.response.status === 401) {
    // Redirect to login page when 401 Unauthorized response is received
    redirectToLogin();
  }

  return Promise.reject(error);
};

instance.interceptors.request.use(attachAuthToken, handleUnauthorizedError);

uploadinstance.interceptors.request.use(
  attachAuthToken,
  handleUnauthorizedError
);
