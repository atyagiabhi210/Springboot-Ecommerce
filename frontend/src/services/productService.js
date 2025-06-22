import axios from 'axios';

const API_URL = '/api/products';

export const getProducts = async (params = {}) => {
    const { page = 0, size = 12, sortBy = 'id', sortDir = 'asc', name, category } = params;

    const queryParams = new URLSearchParams({
        page: page.toString(),
        size: size.toString(),
        sortBy,
        sortDir
    });

    if (name) queryParams.append('name', name);
    if (category) queryParams.append('category', category);

    const response = await axios.get(`${API_URL}?${queryParams}`);
    return response;
};

export const getProductById = async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response;
};

export const getCategories = async () => {
    const response = await axios.get(`${API_URL}/categories`);
    return response;
};

export const createProduct = async (productData) => {
    const response = await axios.post(API_URL, productData);
    return response;
};

export const updateProduct = async (id, productData) => {
    const response = await axios.put(`${API_URL}/${id}`, productData);
    return response;
};

export const deleteProduct = async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response;
}; 