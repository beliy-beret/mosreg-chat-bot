import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || '/';

export const instance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});
