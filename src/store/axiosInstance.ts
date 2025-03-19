import axios from 'axios';

export const instance = axios.create({
  baseURL: 'http://dev.invest.mosreg.ru:10012',
  withCredentials: true,
});
