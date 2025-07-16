import { createBrowserRouter } from 'react-router-dom';

import HomePage from '@/pages/HomePage';
import Settings from '@/pages/Settings';
import About from '@/pages/About';
import Layout from '@/pages/Layout';
import LoginPage from '@/pages/LoginPage';
import ProtectedRoute from '@/components/ProtectedRoute';
import Dashboard from '@/pages/Dashboard';
import ClientsPage from '@/pages/ClientPage';
import ClientDetailsPage from '@/pages/ClientDetailsPage';

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
      { index: true, element: <Dashboard /> },
      { path: 'about', element: <About /> },
      { path: 'settings', element: <Settings /> },
      { path: 'clients', element: <ClientsPage /> },
      { path: 'clients/:id', element: <ClientDetailsPage /> },
    ],
  },
]);

export default router;
