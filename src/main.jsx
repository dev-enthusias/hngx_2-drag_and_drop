import React from 'react';
import ReactDOM from 'react-dom/client';

import { createBrowserRouter, Route, RouterProvider } from 'react-router-dom';

import HomePage from './pages/HomePage';
import SiginPage from './pages/SiginPage';

import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/signin',
    element: <SiginPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
