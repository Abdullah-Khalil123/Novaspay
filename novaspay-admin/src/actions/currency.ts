import { axiosInstance } from '@/utils/axios';

const getAllCurrencies = async (params?: any) => {
  try {
    const response = await axiosInstance.get('/currency/all', { params });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch currencies:', error);
    throw error;
  }
};

const getCurrencyRates = async (id: string) => {
  try {
    const response = await axiosInstance.get('/currency', {
      params: { id },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch currency rates:', error);
    throw error;
  }
};

const createCurrency = async (data: any) => {
  try {
    const response = await axiosInstance.post('/currency', data);
    return response.data;
  } catch (error) {
    console.error('Failed to create currency:', error);
    throw error;
  }
};

const updateCurrency = async (data: any) => {
  try {
    const response = await axiosInstance.put('/currency', data);
    return response.data;
  } catch (error) {
    console.error('Failed to update currency:', error);
    throw error;
  }
};

export { getAllCurrencies, getCurrencyRates, createCurrency, updateCurrency };
