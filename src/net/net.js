// .env 文件
// VITE_API_BASE_URL=

// src/axios.js
import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:3002",
  timeout: 10000,
  // 其他配置...
});

// 请求拦截器
instance.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    console.error('API请求失败:', error);
    return Promise.reject(error);
  }
);

export default instance;