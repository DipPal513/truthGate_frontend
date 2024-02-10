import axios from 'axios';

const AxiosInstance = axios.create({
  baseURL: "https://truthgate-backend.vercel.app",
  withCredentials: true
});

export default AxiosInstance;