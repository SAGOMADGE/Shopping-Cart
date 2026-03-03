import { createBrowserRouter } from 'react-router-dom';
import Layout from '@/components/Layout/Layout';
import Home from '@/pages/Home/Home';
import Shop from '@/pages/Shop/Shop';
import Cart from '@/pages/Cart/Cart';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <div>404 not found</div>,
    children: [
      {
        index: true, // по умлч внутри род пути "/"- <Home />
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
]);
