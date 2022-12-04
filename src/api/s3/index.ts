import customAxios from '../customAxios';

interface uploadForamt {
  file: Blob | File;
}

export async function upload(data: uploadForamt) {
  const formData = new FormData();
  formData.append('file', data.file);
  const axoisFileConfig = { headers: { 'Content-Type': 'multipart/form-data' } };
  console.log(formData, data.file);
  return await customAxios.post('/s3/upload', formData, axoisFileConfig);
}
