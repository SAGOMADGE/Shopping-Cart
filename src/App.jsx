import { RouterProvider } from 'react-router-dom';
import { router } from './routes/routes';
import { Analytics } from '@vercel/analytics/react';

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
      <Analytics />
    </>
  );
};

export default App;
