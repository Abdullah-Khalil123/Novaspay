import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import router from '../src/router/index.tsx';
import './App.css';
import { RouterProvider } from 'react-router-dom';
import QueryProvider from './providers/react-query.tsx';
import ReduxProvider from './providers/redux.tsx';
import { Toaster } from 'sonner';
import ThemeProvider from './providers/ThemeProvider.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ReduxProvider>
      <ThemeProvider>
        <QueryProvider>
          <RouterProvider router={router} />
          <Toaster />
        </QueryProvider>
      </ThemeProvider>
    </ReduxProvider>
  </StrictMode>
);
