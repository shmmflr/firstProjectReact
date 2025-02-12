import axios from 'axios';

export const AxiosServices = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
  timeoutErrorMessage: 'بیش از 10 ثانیه طول کشیده است.',
});
