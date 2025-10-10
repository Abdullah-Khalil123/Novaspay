import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import router from '../src/router/index.tsx';
import './App.css';
import { RouterProvider } from 'react-router-dom';
import QueryProvider from './providers/react-query.tsx';
import ReduxProvider from './providers/redux.tsx';
import { Toaster } from 'react-hot-toast';
import ThemeProvider from './providers/ThemeProvider.tsx';
import FontProvider from './providers/FontProvider.tsx';
import './utils/i18n.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ReduxProvider>
      <FontProvider>
        <ThemeProvider>
          <QueryProvider>
            <RouterProvider router={router} />
            <Toaster position="top-right" />
          </QueryProvider>
        </ThemeProvider>
      </FontProvider>
    </ReduxProvider>
  </StrictMode>
);
