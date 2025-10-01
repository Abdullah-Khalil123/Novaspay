import { axiosInstance } from '@/utils/axios';

const getApplications = async (params?: any) => {
  try {
    const response = await axiosInstance.get('/application', { params });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch applications:', error);
    throw error;
  }
};

const getApplication = async (id: number) => {
  try {
    const response = await axiosInstance.get(`/application/${id}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch application:', error);
    throw error;
  }
};

const createApplication = async (applicationData: any) => {
  try {
    const response = await axiosInstance.post('/application', applicationData);
    return response.data;
  } catch (error) {
    console.error('Failed to create application:', error);
    throw error;
  }
};

const updateApplication = async (id: number, applicationData: any) => {
  try {
    const response = await axiosInstance.put(
      `/application/${id}`,
      applicationData
    );
    return response.data;
  } catch (error) {
    console.error('Failed to update application:', error);
    throw error;
  }
};

export {
  getApplications,
  getApplication,
  createApplication,
  updateApplication,
};
