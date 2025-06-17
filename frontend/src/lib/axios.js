import axios from "axios";

// Use the full URL in production, proxy in development
const BASE_URL = import.meta.env.PROD 
  ? 'http://localhost:5002/api'  // Updated port to match backend
  : '/api';

const instance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add response interceptor for better error handling
instance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 429) {
            console.error("Rate limit exceeded");
        }
        return Promise.reject(error);
    }
);

export default instance;