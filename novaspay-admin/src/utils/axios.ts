import axios from 'axios';
import { getToken } from './getToken';
import { store } from '@/store/store';
import { logout } from '@/store/slices/authSlice';

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const axiosAuth = axios.create({
  baseURL: import.meta.env.VITE_AUTH_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const axiosUpload = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const attachToken = (config: any) => {
  const token = getToken();
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  } else {
    delete config.headers['Authorization'];
  }
  return config;
};

axiosInstance.interceptors.request.use(attachToken, (error) =>
  Promise.reject(error)
);
axiosUpload.interceptors.request.use(attachToken, (error) =>
  Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      store.dispatch(logout()); // clear redux auth state
      window.location.href = '/auth/login'; // force redirect
    }
    return Promise.reject(error);
  }
);
