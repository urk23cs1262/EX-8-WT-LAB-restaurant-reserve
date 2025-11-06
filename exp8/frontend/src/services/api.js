import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Create axios instance with better error handling
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 second timeout
});

// Add request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log(`🔄 Making ${config.method?.toUpperCase()} request to: ${config.url}`);
    return config;
  },
  (error) => {
    console.error('❌ Request error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for better error handling
api.interceptors.response.use(
  (response) => {
    console.log('✅ Response received:', response.status);
    return response;
  },
  (error) => {
    console.error('❌ API Error:', {
      message: error.message,
      code: error.code,
      status: error.response?.status,
      url: error.config?.url
    });
    
    if (error.code === 'ECONNREFUSED') {
      throw new Error('Backend server is not running. Please start the backend server on port 5000.');
    }
    
    if (error.response?.status === 404) {
      throw new Error('API endpoint not found. Check if backend routes are correct.');
    }
    
    throw new Error(error.response?.data?.message || 'Network error. Please check your connection.');
  }
);

export const reservationAPI = {
  // Test connection first
  testConnection: () => api.get('/test'),
  
  // Get all reservations
  getAllReservations: () => api.get('/reservations'),
  
  // Get reservation by ID
  getReservation: (id) => api.get(`/reservations/${id}`),
  
  // Create new reservation
  createReservation: (reservationData) => api.post('/reservations', reservationData),
  
  // Update reservation
  updateReservation: (id, reservationData) => api.put(`/reservations/${id}`, reservationData),
  
  // Delete reservation
  deleteReservation: (id) => api.delete(`/reservations/${id}`),
};

export default api;