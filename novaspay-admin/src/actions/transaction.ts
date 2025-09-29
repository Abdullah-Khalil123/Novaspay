import type { Transaction } from '@/types/transaction';
import { axiosInstance } from '@/utils/axios';

const getAllTransactions = async () => {
  try {
    const response = await axiosInstance.get('/transaction');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch transactions:', error);
    throw error;
  }
};

const getTransaction = async (id: number) => {
  try {
    const response = await axiosInstance.get(`/transaction/${id}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch transaction:', error);
    throw error;
  }
};

const createTransaction = async (transactionData: Transaction) => {
  try {
    const response = await axiosInstance.post('/transaction', transactionData);
    return response.data;
  } catch (error) {
    console.error('Failed to create transaction:', error);
    throw error;
  }
};

const deleteTransaction = async (id: number) => {
  try {
    const response = await axiosInstance.delete(`/transaction/${id}`);
    return response.data;
  } catch (error) {
    console.error('Failed to delete transaction:', error);
    throw error;
  }
};

const updateTransaction = async (id: number, transactionData: Transaction) => {
  try {
    const response = await axiosInstance.put(
      `/transaction/${id}`,
      transactionData
    );
    return response.data;
  } catch (error) {
    console.error('Failed to update transaction:', error);
    throw error;
  }
};

export {
  getAllTransactions,
  createTransaction,
  deleteTransaction,
  updateTransaction,
  getTransaction,
};
