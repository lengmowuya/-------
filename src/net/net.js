// .env 文件
// VITE_API_BASE_URL=

// src/axios.js
import axios from 'axios';

const instance = axios.create({
  baseURL: "http://103.106.190.210:1337", // 使用环境变量
  timeout: 1000,
  // 其他配置...
});

const myToken = "c6368ce31ba2150c187dbda77c090be5180a7ea539fdafbd9020c33579ca4f5e13f13ce982741dd59644786af33dd12ae051131bd5db208f5e9c414d09f6d0f18b64459cc0ed19c60544e1e099106d99ec1f7cf331f6cc4c8f3a77f9a34ad4b5cda38a377f0359a488a9a11599c2887b9f9ace6dfb8b1166b55dd73e68a3c095";
// 设置全局请求头
instance.defaults.headers.common['Authorization'] = `Bearer ${myToken}`;
export default instance;