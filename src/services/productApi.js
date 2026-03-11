import apiClient from './apiClient';

export const getProducts = async (params) => {
    const response = await apiClient.get('/api/products', { params });
    return response.data;
};

export const getProductById = async (id) => {
    const response = await apiClient.get(`/api/products/${id}`);
    return response.data;
};
