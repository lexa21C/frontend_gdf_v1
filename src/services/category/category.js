import axios from 'axios';
export const getCategoriesRequest =  async () => axios.get('api/v1/categories');