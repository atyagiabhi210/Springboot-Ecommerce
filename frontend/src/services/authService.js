import axios from 'axios';

const API_URL = '/api/auth';

// Set up axios interceptor for auth token
let authToken = null;

export const setAuthToken = (token) => {
    authToken = token;
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
};

export const removeAuthToken = () => {
    authToken = null;
    delete axios.defaults.headers.common['Authorization'];
};

export const login = async (credentials) => {
    const response = await axios.post(`${API_URL}/signin`, credentials);
    return response;
};

export const register = async (userData) => {
    const response = await axios.post(`${API_URL}/signup`, userData);
    return response;
};

export const getCurrentUser = () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
};

export const getAuthToken = () => {
    return authToken || localStorage.getItem('token');
}; 