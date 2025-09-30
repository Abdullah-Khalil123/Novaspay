import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import router from '../src/router/index.tsx';
import './App.css';
import { RouterProvider } from 'react-router-dom';
import QueryProvider from './providers/react-query.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryProvider>
      <RouterProvider router={router} />
      {/* <Toaster /> */}
    </QueryProvider>
  </StrictMode>
);
