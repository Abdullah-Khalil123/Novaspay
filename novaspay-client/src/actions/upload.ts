import { axiosUpload } from '@/utils/axios';

const upload = async (data: FormData) => {
  try {
    const response = await axiosUpload.post('/upload', data);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export { upload };
