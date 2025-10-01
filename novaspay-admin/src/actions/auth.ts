import { axiosAuth } from '@/utils/axios';

const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const response = await axiosAuth.post('api/auth/login', {
      email: email,
      password: password,
    });
    return response.data;
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};

export { login };
