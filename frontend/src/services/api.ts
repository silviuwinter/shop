import axios from 'axios';
import { useUserStore } from '../../store/userStore';

export const $api = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
      'Content-Type': 'application/json',
    },
});

// Add an interceptor that removes Content-Type for FormData requests
// as the browser will set the appropriate Content-Type with boundary
$api.interceptors.request.use(config => {
  if (config.data instanceof FormData) {
    // Let the browser set the Content-Type for FormData
    if (config.headers) {
      delete config.headers['Content-Type'];
    }
  }

  // Add Bearer token from Zustand store
  const token = useUserStore.getState().auth?.token;
  if (token && config.headers) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  return config;
});