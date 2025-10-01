import type { Params } from '@/types/params';
import { axiosInstance } from '@/utils/axios';

const getApplication = async (params?: Params) => {
  try {
    const response = await axiosInstance.get('/application', { params });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch applications:', error);
    throw error;
  }
};

const createApplication = async (data: any) => {
  try {
    const response = await axiosInstance.post('/application', data);
    return response.data;
  } catch (error) {
    console.error('Failed to create application:', error);
    throw error;
  }
};

export { getApplication, createApplication };
