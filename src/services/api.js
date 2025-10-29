import api from '../utils/api';

// Menu API
export const getMenuItems = async (category = null) => {
  const params = category ? { category } : {};
  const response = await api.get('/api/menu', { params });
  return response.data;
};

export const getMenuItemById = async (id) => {
  const response = await api.get(`/api/menu/${id}`);
  return response.data;
};

// Order API
export const createOrder = async (orderData) => {
  const response = await api.post('/api/orders/checkout', orderData);
  return response.data;
};

export const getOrders = async () => {
  const response = await api.get('/api/orders');
  return response.data;
};

export const getOrderById = async (id) => {
  const response = await api.get(`/api/orders/${id}`);
  return response.data;
};

// Reservation API
export const createReservation = async (reservationData) => {
  const response = await api.post('/api/reservations', reservationData);
  return response.data;
};

export const getReservations = async () => {
  const response = await api.get('/api/reservations');
  return response.data;
};

// Auth API
export const signup = async (userData) => {
  const response = await api.post('/api/auth/signup', userData);
  return response.data;
};

export const login = async (credentials) => {
  const response = await api.post('/api/auth/login', credentials);
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
  }
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

export const getProfile = async () => {
  const response = await api.get('/api/auth/profile');
  return response.data;
};

export const updateProfile = async (profileData) => {
  const response = await api.put('/api/auth/profile', profileData);
  return response.data;
};

// Chatbot API
export const sendChatMessage = async (message) => {
  const response = await api.post('/api/chatbot', { message });
  return response.data;
};

// Feedback API
export const createFeedback = async (feedbackData) => {
  const response = await api.post('/api/feedback', feedbackData);
  return response.data;
};

export const getFeedbacks = async () => {
  const response = await api.get('/api/feedback');
  return response.data;
};

