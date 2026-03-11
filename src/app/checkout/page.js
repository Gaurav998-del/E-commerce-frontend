'use client';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { placeOrder } from '../../redux/orderSlice';
import { clearCart } from '../../redux/cartSlice';
import { initializeRazorpayCheckout } from '../../utils/razorpayCheckout';
import CheckoutSummary from '../../components/CheckoutSummary';
import { useAuth } from '../../hooks/useAuth';
import Link from 'next/link';

export default function CheckoutPage() {
    const dispatch = useDispatch();
    const router = useRouter();
    const { user, isAuthenticated } = useAuth();
    const { items, totalQty } = useSelector((state) => state.cart);
    const [isProcessing, setIsProcessing] = useState(false);
    const [errorDetails, setErrorDetails] = useState('');

    const [shippingAddress, setShippingAddress] = useState({
        address: '',
        city: '',
        postalCode: '',
        country: 'India',
    });

    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/login?redirect=checkout');
        } else if (items.length === 0) {
            router.push('/cart');
        }
    }, [isAuthenticated, items, router]);

    const handleChange = (e) => {
        setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value });
    };

    const handleProceedToPay = async (totalAmount) => {
        // Basic validation
        if (!shippingAddress.address || !shippingAddress.city || !shippingAddress.postalCode) {
            setErrorDetails('Please fill in all shipping address fields.');
            return;
        }

        setErrorDetails('');
        setIsProcessing(true);

        try {
            // 1. Create order in backend
            const orderAction = await dispatch(placeOrder({
                orderItems: items.map(item => ({
                    product: item.product._id,
                    name: item.product.name,
                    quantity: item.quantity,
                    price: item.product.price,
                })),
                shippingAddress,
                paymentMethod: 'Razorpay',
                itemsPrice: totalAmount, // Simplification for MVP
                taxPrice: 0,
                shippingPrice: 0,
                totalPrice: totalAmount,
            })).unwrap(); // Use unwrap to catch errors from rejected thunks

            const orderId = orderAction._id;

            // 2. Initialize Razorpay Checkout
            await initializeRazorpayCheckout(
                orderId,
                totalAmount,
                user,
                (verificationResult) => {
                    // Success Callback
                    dispatch(clearCart());
                    router.push(`/orders/success?orderId=${orderId}`);
                },
                (error) => {
                    // Error Callback
                    setIsProcessing(false);
                    setErrorDetails(error.message || 'Payment failed. Please try again.');
                }
            );
        } catch (err) {
            setIsProcessing(false);
            setErrorDetails(err.message || 'Failed to place order.');
        }
    };

    if (!isAuthenticated || items.length === 0) return null;

    return (
        <div className="py-8">
            <h1 className="text-3xl font-black text-gray-900 tracking-tight mb-8">Checkout</h1>

            {errorDetails && (
                <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-8 border border-red-100 flex items-center justify-between">
                    <p className="font-medium">{errorDetails}</p>
                    <button onClick={() => setErrorDetails('')} className="text-red-400 hover:text-red-700 p-1">✕</button>
                </div>
            )}

            <div className="flex flex-col lg:flex-row gap-12 items-start">
                {/* Shipping Form */}
                <div className="lg:w-2/3 w-full bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-8">

                    <div>
                        <h2 className="text-xl font-bold text-gray-900 mb-6 drop-shadow-sm flex items-center gap-2">
                            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 text-sm">1</span>
                            Shipping Address
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="col-span-1 md:col-span-2 space-y-2">
                                <label className="text-sm font-semibold text-gray-700">Street Address</label>
                                <input
                                    type="text"
                                    name="address"
                                    value={shippingAddress.address}
                                    onChange={handleChange}
                                    placeholder="123 Main St, Apt 4B"
                                    className="input-field shadow-sm"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700">City</label>
                                <input
                                    type="text"
                                    name="city"
                                    value={shippingAddress.city}
                                    onChange={handleChange}
                                    placeholder="Mumbai"
                                    className="input-field shadow-sm"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700">Postal Code</label>
                                <input
                                    type="text"
                                    name="postalCode"
                                    value={shippingAddress.postalCode}
                                    onChange={handleChange}
                                    placeholder="400001"
                                    className="input-field shadow-sm"
                                    required
                                />
                            </div>

                            <div className="col-span-1 md:col-span-2 space-y-2">
                                <label className="text-sm font-semibold text-gray-700">Country</label>
                                <input
                                    type="text"
                                    name="country"
                                    value={shippingAddress.country}
                                    onChange={handleChange}
                                    className="input-field shadow-sm bg-gray-100 text-gray-500 cursor-not-allowed"
                                    disabled
                                />
                            </div>
                        </div>
                    </div>

                    <hr className="border-gray-100" />

                    <div>
                        <h2 className="text-xl font-bold text-gray-900 mb-6 drop-shadow-sm flex items-center gap-2 opacity-75">
                            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 text-gray-600 text-sm">2</span>
                            Payment details
                        </h2>
                        <p className="text-sm text-gray-500 bg-gray-50 p-4 rounded-xl">
                            Proceed to payment to open the secure Razorpay payment gateway. You can choose from Credit/Debit cards, UPI, Wallets, or Netbanking.
                        </p>
                    </div>
                </div>

                {/* Order Summary */}
                <div className="lg:w-1/3 w-full">
                    <CheckoutSummary onProceedToPay={handleProceedToPay} isProcessing={isProcessing} />
                </div>
            </div>
        </div>
    );
}
