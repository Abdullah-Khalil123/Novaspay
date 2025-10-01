import { axiosUpload } from '@/utils/axios';

const uploadImage = async (file: any) => {
  try {
    const response = await axiosUpload.post('/upload/image', file);
    return response.data;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};

export { uploadImage };
