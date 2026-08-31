import axios from 'axios';

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 60000, // 60s timeout to handle free cloud cold starts gracefully
});

apiClient.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const isTimeout = error.code === 'ECONNABORTED' || error.message?.includes('timeout');
    const customError = {
      message: isTimeout
        ? 'Server is waking up from sleep. Please wait a moment and try again.'
        : error.response?.data?.message || error.message || 'Something went wrong',
      errors: error.response?.data?.errors || [],
      statusCode: error.response?.status || (isTimeout ? 504 : 500),
    };
    return Promise.reject(customError);
  }
);
