import { ContactFormSchemaType } from '@/schema/contact';
import { ApiService } from '.';
import { BASE_URL } from '@/lib/constant';

const apiService = new ApiService(`${BASE_URL}/api`);

console.log(apiService);

export const sendContactForm = async (data: ContactFormSchemaType) => {
  const response = await apiService.post('/contact', data);
  return response;
};
