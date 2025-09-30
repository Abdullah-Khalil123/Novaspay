import type { OnBoarding } from '@/types/onBoarding';
import { axiosInstance } from '@/utils/axios';

const getAllOnboardings = async () => {
  try {
    const response = await axiosInstance.get('/onboarding');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch onboardings:', error);
    throw error;
  }
};

const getOnboarding = async (id: number) => {
  try {
    const response = await axiosInstance.get(`/onboarding/${id}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch onboarding:', error);
    throw error;
  }
};

const createOnboarding = async (data: OnBoarding) => {
  try {
    const response = await axiosInstance.post('/onboarding', data);
    return response.data;
  } catch (error) {
    console.error('Failed to create onboarding:', error);
    throw error;
  }
};

const deleteOnboarding = async (id: number) => {
  try {
    const response = await axiosInstance.delete(`/onboarding/${id}`);
    return response.data;
  } catch (error) {
    console.error('Failed to delete onboarding:', error);
    throw error;
  }
};

const updateOnboarding = async (id: number, data: OnBoarding) => {
  try {
    const response = await axiosInstance.put(`/onboarding/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Failed to update onboarding:', error);
    throw error;
  }
};

export {
  getAllOnboardings,
  getOnboarding,
  createOnboarding,
  deleteOnboarding,
  updateOnboarding,
};
