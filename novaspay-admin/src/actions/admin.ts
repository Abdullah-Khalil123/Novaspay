import { axiosInstance } from '@/utils/axios';

const getAllAdmins = async (params?: any) => {
  try {
    const response = await axiosInstance.get('/admin-route/all', { params });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch admins:', error);
    throw error;
  }
};

const getAdmin = async (id: number) => {
  try {
    const response = await axiosInstance.get(`/admin-route/${id}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch admin:', error);
    throw error;
  }
};

const createAdmin = async (adminData: any) => {
  try {
    const response = await axiosInstance.post('/admin-route', adminData);
    return response.data;
  } catch (error) {
    console.error('Failed to create admin:', error);
    throw error;
  }
};

const deleteAdmin = async (id: number) => {
  try {
    const response = await axiosInstance.delete(`/admin-route/${id}`);
    return response.data;
  } catch (error) {
    console.error('Failed to delete admin:', error);
    throw error;
  }
};

const updateAdmin = async (id: number, adminData: any) => {
  try {
    const response = await axiosInstance.put(`/admin-route/${id}`, adminData);
    return response.data;
  } catch (error) {
    console.error('Failed to update admin:', error);
    throw error;
  }
};

export { createAdmin, deleteAdmin, getAdmin, updateAdmin, getAllAdmins };
