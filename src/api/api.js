import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api', // 공통 API 경로
});

// 요청 인터셉터
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token'); // 로그인 시 저장한 토큰
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export default api;