import axios from 'axios';

const API_URL = '/api/cart';

export const getCart = async () => {
    const response = await axios.get(API_URL);
    return response;
};

export const addToCart = async (productId, quantity) => {
    const response = await axios.post(`${API_URL}/add`, {
        productId,
        quantity
    });
    return response;
};

export const updateQuantity = async (productId, quantity) => {
    const response = await axios.put(`${API_URL}/update`, {
        productId,
        quantity
    });
    return response;
};

export const removeFromCart = async (productId) => {
    const response = await axios.delete(`${API_URL}/remove/${productId}`);
    return response;
};

export const clearCart = async () => {
    const response = await axios.delete(`${API_URL}/clear`);
    return response;
};

export const getCartTotal = async () => {
    const response = await axios.get(`${API_URL}/total`);
    return response;
}; 