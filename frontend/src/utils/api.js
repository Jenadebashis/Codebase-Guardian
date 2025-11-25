import axios from 'axios';
import store from '../redux/store';

const api = axios.create({
  baseURL: 'http://localhost:5001/api'
});

api.interceptors.request.use(config => {
  const token = store.getState().auth.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // Let axios handle the Content-Type header automatically for FormData.
  // For other requests, explicitly set it to application/json.
  if (!(config.data instanceof FormData)) {
    config.headers['Content-Type'] = 'application/json';
  }

  return config;
});

export default api;
// finally work handled till day 52 clearly...