import type { Params } from '@/types/params';
import type { VA } from '@/types/va';
import { axiosInstance } from '@/utils/axios';

const getAllVAs = async (params?: Params) => {
  try {
    const response = await axiosInstance.get('/va', {
      params,
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch VAs:', error);
    throw error;
  }
};

const getVA = async (id: number) => {
  try {
    const response = await axiosInstance.get(`/va/${id}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch VA:', error);
    throw error;
  }
};

const createVA = async (data: VA) => {
  try {
    const response = await axiosInstance.post('/va', data);
    return response.data;
  } catch (error) {
    console.error('Failed to create VA:', error);
    throw error;
  }
};

const deleteVA = async (id: number) => {
  try {
    const response = await axiosInstance.delete(`/va/${id}`);
    return response.data;
  } catch (error) {
    console.error('Failed to delete VA:', error);
    throw error;
  }
};

const updateVA = async (id: number, data: VA) => {
  try {
    const response = await axiosInstance.put(`/va/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Failed to update VA:', error);
    throw error;
  }
};

export { getAllVAs, getVA, createVA, deleteVA, updateVA };
