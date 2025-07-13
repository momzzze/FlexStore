import { createBrowserRouter } from 'react-router-dom';

import HomePage from '@/pages/HomePage';
import Settings from '@/pages/Settings';
import About from '@/pages/About';
import Layout from '@/pages/Layout';
import LoginPage from '@/pages/LoginPage';
import ProtectedRoute from '@/components/ProtectedRoute';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <HomePage /> },
      { path: 'about', element: <About /> },
      { path: 'settings', element: <Settings /> },
    ],
  },
]);

export default router;
