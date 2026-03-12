import apiClient from './apiClient';

export const getCart = async () => {
    const response = await apiClient.get('/api/cart');
    return response.data;
};

export const addToCart = async (product_id, quantity) => {
    const response = await apiClient.post('/api/cart/add', { product_id, quantity });
    return response.data;
};

export const updateCartItem = async (productId, quantity) => {
    const response = await apiClient.put(`/api/cart/update/${productId}`, { quantity });
    return response.data;
};

export const removeFromCart = async (productId) => {
    const response = await apiClient.delete(`/api/cart/remove/${productId}`);
    return response.data;
};
