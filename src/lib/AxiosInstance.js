// axiosInstance.js (or any other file name)
import axios from 'axios';

const AxiosInstance = axios.create({
  baseURL: 'https://truthgate-backend.vercel.app', // replace this with your API base URL
  // You can also add other configuration options here
});

export default AxiosInstance;
