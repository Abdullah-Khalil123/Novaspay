import type { Account } from '@/types/accounts';
import { axiosInstance } from '@/utils/axios';

const getAllAccounts = async (params?: any) => {
  try {
    const response = await axiosInstance.get('/account', { params });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch accounts:', error);
    throw error;
  }
};

const getAccount = async (id: number) => {
  try {
    const response = await axiosInstance.get(`/account/${id}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch account:', error);
    throw error;
  }
};

const createAccount = async (accountData: Account) => {
  try {
    const response = await axiosInstance.post('/account', accountData);
    return response.data;
  } catch (error) {
    console.error('Failed to create account:', error);
    throw error;
  }
};

const deleteAccount = async (id: number) => {
  try {
    const response = await axiosInstance.delete(`/account/${id}`);
    return response.data;
  } catch (error) {
    console.error('Failed to delete account:', error);
    throw error;
  }
};

const updateAccount = async (id: number, accountData: Account) => {
  try {
    const response = await axiosInstance.put(`/account/${id}`, accountData);
    return response.data;
  } catch (error) {
    console.error('Failed to update account:', error);
    throw error;
  }
};

export {
  getAllAccounts,
  getAccount,
  createAccount,
  deleteAccount,
  updateAccount,
};
