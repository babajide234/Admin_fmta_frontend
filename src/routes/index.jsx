import { createBrowserRouter } from 'react-router-dom';
import DashLayout from '../layouts/DashLayout';
import DashboardHome from '../pages/DashboardHome';
import AuthLayout from '../layouts/AuthLayout';
import Login from '../pages/Auth/Login';
import Products from '../pages/Products';

const router = createBrowserRouter([
  {
    path: '/',
    element: <DashLayout />,
    children: [
      {
        path: '/',
        element: <DashboardHome />,
      },
      {
        path: '/products',
        element: <Products />,
      },
    ],
  },
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      {
        path: '/login',
        element: <Login />,
      },
    ],
  },
]);

export default router;
