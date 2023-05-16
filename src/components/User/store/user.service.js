import axios from 'axios';

const BASE_URL = 'https://dummyjson.com/';

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getUsers = () => {
  return api.get('/users');
};
