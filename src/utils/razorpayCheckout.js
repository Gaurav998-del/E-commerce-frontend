import { verifyPayment } from '../services/orderApi';

const loadScript = (src) => {
    return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => {
            resolve(true);
        };
        script.onerror = () => {
            resolve(false);
        };
        document.body.appendChild(script);
    });
};

export const initializeRazorpayCheckout = async (orderId, amount, userData, onSuccess, onError) => {
    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');

    if (!res) {
        onError(new Error('Razorpay SDK failed to load. Are you online?'));
        return;
    }

    // Assuming NEXT_PUBLIC_RAZORPAY_KEY is defined in environment
    const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY || 'rzp_test_placeholder', // Enter the Key ID generated from the Dashboard
        amount: amount * 100, // Amount is in currency subunits (paise for INR)
        currency: 'INR',
        name: 'E-Commerce Store',
        description: `Test Transaction for Order ${orderId}`,
        order_id: orderId, // This should be the razorpay order_id created via your backend
        handler: async function (response) {
            try {
                const verifyData = {
                    razorpay_order_id: response.razorpay_order_id,
                    razorpay_payment_id: response.razorpay_payment_id,
                    razorpay_signature: response.razorpay_signature,
                };
                const result = await verifyPayment(verifyData);
                onSuccess(result);
            } catch (err) {
                onError(err);
            }
        },
        prefill: {
            name: userData?.name || 'Customer',
            email: userData?.email || 'customer@example.com',
            contact: userData?.phone || '9999999999',
        },
        theme: {
            color: '#3b82f6', // Tailwind blue-500
        },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.on('payment.failed', function (response) {
        onError(new Error(response.error.description));
    });
    paymentObject.open();
};
