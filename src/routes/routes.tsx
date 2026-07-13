import { createBrowserRouter, type RouteObject } from 'react-router-dom';
import Layout from '@/components/Layout/Layout';
import Home from '@/pages/Home/Home';
import Shop from '@/pages/Shop/Shop';
import Cart from '@/pages/Cart/Cart';
import ErrorPage from '@/components/ErrorPage/ErrorPage';

export const routes = [
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'shop',
        element: <Shop />,
      },
      {
        path: 'cart',
        element: <Cart />,
      },
    ],
  },
] satisfies RouteObject[];

export const router = createBrowserRouter(routes);
