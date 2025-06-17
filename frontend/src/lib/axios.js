import axios from "axios";

// Use the full URL in production, proxy in development
const BASE_URL = import.meta.env.PROD 
  ? '/api'  // In production, use relative path since frontend and backend are served from same domain
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