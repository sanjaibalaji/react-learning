import axios from 'axios';

const api = axios.create({
  baseURL: 'https://66d08599181d059277deec95.mockapi.io/api/users',
  timeout: 5000,
});

export default api;
