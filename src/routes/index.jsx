import { createBrowserRouter } from "react-router-dom";
import DashLayout from "../layouts/DashLayout";
import DashboardHome from "../pages/DashboardHome";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Auth/Login";
import Products from "../pages/Products";
import Category from "../pages/Category";
import Markup from "../pages/Markup";
import Orders from "../pages/Orders";
import User from "../pages/User";
import Account from "../pages/Account";
import Profile from "../components/Profile";
import Org from "../pages/Org";
// import productSlice from "../store/productStore";

// const getProducts = productSlice.getState().getProducts;

const router = createBrowserRouter([
  {
    path: "/",
    element: <DashLayout />,
    children: [
      {
        path: "/",
        element: <DashboardHome />,
      },
      {
        path: "/products",
        element: <Products />,
        // loader() {
        //   return getProducts();
        // },
      },
      {
        path: "/categories",
        element: <Category />,
      },
      {
        path: "/markup",
        element: <Markup />,
      },
      {
        path: "/orders",
        element: <Orders />,
      },
      {
        path: "/users",
        element: <User />,
      },
      {
        path: "/account",
        element: <Account />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/organization",
        element: <Org />,
      },
    ],
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);

export default router;
