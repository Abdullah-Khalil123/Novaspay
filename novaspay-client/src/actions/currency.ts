import { axiosInstance } from '@/utils/axios';

const getCurrencyRates = async (params?: Record<string, string>) => {
  try {
    const response = await axiosInstance.get('/currency', {
      params,
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch currency rates:', error);
    throw error;
  }
};

export { getCurrencyRates };
