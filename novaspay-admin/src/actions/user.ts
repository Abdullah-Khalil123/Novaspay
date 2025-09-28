import { axiosInstance } from '@/utils/axios';

const getUsers = async (params: any) => {
  try {
    const response = await axiosInstance.get('/users', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

const getUserById = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/users/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    throw error;
  }
};

const updateUser = async (id: string, data: any) => {
  try {
    const response = await axiosInstance.put(`/users/${id}`, null, {
      params: { ...data },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

const updateUserStatus = async (id: string, status: string, reason: string) => {
  try {
    const response = await axiosInstance.patch(`/users/${id}/status`, null, {
      params: { status, reason },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating user status:', error);
    throw error;
  }
};

const deleteUser = async (id: string) => {
  try {
    const response = await axiosInstance.delete(`/users/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};

const adjustUserBalance = async (
  id: string,
  amount: number,
  reason: string
) => {
  try {
    const response = await axiosInstance.post(
      `/users/${id}/wallet/adjust`,
      null,
      {
        params: { amount, reason },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error adjusting user balance:', error);
    throw error;
  }
};

const getUserTransactions = async (id: string, params: any) => {
  try {
    const response = await axiosInstance.get(
      `/users/${id}/wallet/transactions`,
      {
        params,
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching user transactions:', error);
    throw error;
  }
};

const getUserWithdrawals = async (id: string, params: any) => {
  try {
    const response = await axiosInstance.get(`/users/${id}/withdraws`, {
      params,
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user withdrawals:', error);
    throw error;
  }
};

export {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  adjustUserBalance,
  getUserTransactions,
  getUserWithdrawals,
  updateUserStatus,
};
