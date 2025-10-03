import type { Client } from '@/types/client';
import { axiosInstance } from '@/utils/axios';

const getAllClients = async (params?: any) => {
  try {
    const response = await axiosInstance.get('/client', {
      params,
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch clients:', error);
    throw error;
  }
};

const getClient = async (id: number) => {
  try {
    const response = await axiosInstance.get(`/client/${id}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch client:', error);
    throw error;
  }
};

const createClient = async (data: Client) => {
  try {
    const response = await axiosInstance.post('/client', data);
    return response.data;
  } catch (error) {
    console.error('Failed to create client:', error);
    throw error;
  }
};

const deleteClient = async (id: number) => {
  try {
    const response = await axiosInstance.delete(`/client/${id}`);
    return response.data;
  } catch (error) {
    console.error('Failed to delete client:', error);
    throw error;
  }
};

const updateClient = async (id: number, data: Client) => {
  try {
    const response = await axiosInstance.put(`/client/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Failed to update client:', error);
    throw error;
  }
};

export { getAllClients, getClient, createClient, deleteClient, updateClient };
