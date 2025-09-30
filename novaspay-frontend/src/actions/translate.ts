import { axiosInstance } from '@/utils/axios';

const translate = async (content: string) => {
  try {
    const response = await axiosInstance.post('/translate', null, {
      params: {
        content,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Translation error:', error);
    throw error;
  }
};

export { translate };
