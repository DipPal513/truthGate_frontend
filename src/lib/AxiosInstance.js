// axiosInstance.js (or any other file name)
import axios from 'axios';
const AxiosInstance = axios.create({
  
  baseURL: 'http://localhost:4000', // replace this with your API base URL
  // You can also add other configuration options here
  withCredentials:true
  
});

export default AxiosInstance;
