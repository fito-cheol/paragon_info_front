import customAxios from 'api/customAxios';

interface UploadFormat {
  file: Blob | File;
}

export async function uploadImage(data: UploadFormat) {
  const formData = new FormData();
  formData.append('file', data.file);
  const axoisFileConfig = { headers: { 'Content-Type': 'multipart/form-data' } };

  const response = await customAxios.post('/s3/uploadWebpImage', formData, axoisFileConfig);
  return response.data;
}
