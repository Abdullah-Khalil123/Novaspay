import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import QueryProvider from './providers/react-query';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { Toaster } from 'sonner';
import './App.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <QueryProvider>
        <RouterProvider router={router} />
        <Toaster />
      </QueryProvider>
    </Provider>
  </StrictMode>
);
