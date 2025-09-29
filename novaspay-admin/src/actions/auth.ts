import { axiosInstance } from '@/utils/axios';

const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const response = await axiosInstance.post('/user/login', {
      email: email,
      password: password,
    });
    return response.data;
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};

// const me = async () => {
//   try {
//     const response = await axiosInstance.get('/auth/me');
//     return response.data;
//   } catch (error) {
//     console.error('Failed to fetch user data:', error);
//     throw error;
//   }
// };

// const logout = async () => {
//   try {
//     const response = await axiosInstance.delete('/auth/logout');
//     return response.data;
//   } catch (error) {
//     console.error('Logout failed:', error);
//     throw error;
//   }
// };

export { login /* me, logout */ };
