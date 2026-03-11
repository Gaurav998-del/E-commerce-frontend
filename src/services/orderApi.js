import apiClient from './apiClient';

export const createOrder = async (orderData) => {
    const response = await apiClient.post('/api/orders', orderData);
    return response.data;
};

export const createPaymentSession = async (orderId) => {
    const response = await apiClient.post('/api/payments/create-session', { orderId });
    return response.data;
};

export const verifyPayment = async (paymentData) => {
    const response = await apiClient.post('/api/payments/verify', paymentData);
    return response.data;
};
