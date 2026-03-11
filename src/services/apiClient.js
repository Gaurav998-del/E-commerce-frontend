import axios from 'axios';

// The base URL for the backend API
// Defaults to localhost:5000 if not provided in environment
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to attach JWT token
apiClient.interceptors.request.use(
  (config) => {
    // In a Next.js environment (client-side), we could read the token from localStorage
    // since Redux state might not be directly accessible within an axios interceptor without circular dependencies,
    // or we can pass it explicitly. Here we attempt to get from localStorage on the client side.
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
