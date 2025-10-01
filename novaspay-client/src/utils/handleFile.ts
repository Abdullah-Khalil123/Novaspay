import { uploadImage } from '@/actions/images';

export const handleFile = async (fileList: FileList | string | undefined) => {
  if (!fileList || fileList.length === 0) return null;
  if (fileList instanceof FileList && fileList.length > 0) {
    const formData = new FormData();
    formData.append('image', fileList[0]);

    const response = await uploadImage(formData);
    return response.data.path;
  } else if (fileList instanceof File) {
    const formData = new FormData();
    formData.append('image', fileList);

    const response = await uploadImage(formData);
    return response.data.path;
  }
  return fileList || null;
};
