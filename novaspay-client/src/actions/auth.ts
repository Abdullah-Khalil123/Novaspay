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

const resetPassword = async ({
  oldPassword,
  newPassword,
}: {
  oldPassword: string;
  newPassword: string;
}) => {
  try {
    const response = await axiosInstance.post('/user/reset-password', {
      oldPassword: oldPassword,
      newPassword: newPassword,
    });
    return response.data;
  } catch (error) {
    console.error('Password reset failed:', error);
    throw error;
  }
};

const registerUser = async ({
  name,
  email,
  password,
  country,
  accountType,
}: {
  name: string;
  email: string;
  password: string;
  country: string;
  accountType: string;
}) => {
  try {
    const response = await axiosInstance.post('/user/register', {
      name,
      email,
      password,
      country,
      accountType,
    });
    return response.data;
  } catch (error) {
    console.error('Registration failed:', error);
    throw error;
  }
};

export { login, resetPassword, registerUser };
