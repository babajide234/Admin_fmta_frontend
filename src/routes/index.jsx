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
import Invite from "../pages/Invite";
import Invoice from "../components/Order/Invoice";
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
        path: "/account",
        element: <Account />,
      },
      {
        path: "/categories",
        element: <Category />,
      },
      {
        path: '/invite',
        element: <Invite />
      },
      {
        path: '/invoice',
        element: <Invoice />
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
        path: "/organization",
        element: <Org />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/users",
        element: <User />,
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
