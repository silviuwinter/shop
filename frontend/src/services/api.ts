import axios from 'axios';
import { useUserStore } from '../../store/userStore';

export const $api = axios.create({
    baseURL: 'http://localhost:3000', // base url for all api requests
    headers: {
      'Content-Type': 'application/json', // default content type for json requests
    },
});

// adds custom behavior to requests before they are sent
$api.interceptors.request.use(config => {
  if (config.data instanceof FormData) {
    // if the data is formdata, remove content-type so browser sets it
    if (config.headers) {
      delete config.headers['Content-Type'];
    }
  }

  // grab the auth token from the user store
  const token = useUserStore.getState().auth?.token;
  if (token && config.headers) {
    config.headers['Authorization'] = `Bearer ${token}`; // attach token to requests
  }

  return config; // send the modified config
});