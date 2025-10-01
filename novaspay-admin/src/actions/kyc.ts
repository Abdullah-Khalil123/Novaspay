import type { KYC } from '@/types/kyc';
import { axiosInstance } from '@/utils/axios';

const getAllKYCs = async (params?: any) => {
  try {
    const response = await axiosInstance.get('/kyc', {
      params,
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch KYCs:', error);
    throw error;
  }
};

const getKYC = async (id: number) => {
  try {
    const response = await axiosInstance.get(`/kyc/${id}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch KYC:', error);
    throw error;
  }
};

const createKYC = async (kycData: KYC) => {
  try {
    const response = await axiosInstance.post('/kyc', kycData);
    return response.data;
  } catch (error) {
    console.error('Failed to create KYC:', error);
    throw error;
  }
};

const deleteKYC = async (id: number) => {
  try {
    const response = await axiosInstance.delete(`/kyc/${id}`);
    return response.data;
  } catch (error) {
    console.error('Failed to delete KYC:', error);
    throw error;
  }
};

const updateKYC = async (id: number, kycData: KYC) => {
  try {
    const response = await axiosInstance.put(`/kyc/${id}`, kycData);
    return response.data;
  } catch (error) {
    console.error('Failed to update KYC:', error);
    throw error;
  }
};

export { getAllKYCs, getKYC, createKYC, deleteKYC, updateKYC };
