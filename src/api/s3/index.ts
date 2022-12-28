import customAxios from 'api/customAxios';

interface uploadForamt {
  file: Blob | File;
}

export async function uploadImage(data: uploadForamt) {
  const formData = new FormData();
  formData.append('file', data.file);
  const axoisFileConfig = { headers: { 'Content-Type': 'multipart/form-data' } };

  const response = await customAxios.post('/s3/uploadImage', formData, axoisFileConfig);
  return response.data;
}
