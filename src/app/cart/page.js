'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart } from '../../redux/cartSlice';
import CartItem from '../../components/CartItem';
import CheckoutSummary from '../../components/CheckoutSummary';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShoppingBag, ArrowLeft } from 'lucide-react';

export default function CartPage() {
    const dispatch = useDispatch();
    const router = useRouter();
    const { items, isLoading, totalQty } = useSelector((state) => state.cart);

    useEffect(() => {
        dispatch(fetchCart());
    }, [dispatch]);

    const handleProceedToPay = () => {
        router.push('/checkout');
    };

    if (isLoading && items.length === 0) {
        return (
            <div className="py-12 animate-pulse max-w-7xl mx-auto">
                <div className="h-8 bg-gray-200 rounded w-48 mb-8"></div>
                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="lg:w-2/3 space-y-6">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="h-40 bg-gray-200 rounded-2xl"></div>
                        ))}
                    </div>
                    <div className="lg:w-1/3">
                        <div className="h-96 bg-gray-200 rounded-2xl"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (items.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 px-4 min-h-[60vh]">
                <div className="bg-gray-50 p-6 rounded-full mb-6 relative">
                    <ShoppingBag className="w-16 h-16 text-gray-300" />
                    <div className="absolute top-0 right-0 w-6 h-6 bg-red-500 rounded-full border-4 border-white"></div>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
                <p className="text-gray-500 mb-8 max-w-sm text-center">Looks like you haven't added anything to your cart yet. Discover our latest collections.</p>
                <Link href="/products" className="btn-primary w-full max-w-xs px-8 py-4 text-lg">
                    Start Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="py-8">
            <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-100">
                <h1 className="text-3xl font-black text-gray-900 tracking-tight">Your Cart</h1>
                <span className="bg-blue-100 text-blue-800 text-sm font-bold px-3 py-1 rounded-full">
                    {totalQty} Items
                </span>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
                {/* Cart Items List */}
                <div className="lg:w-2/3 w-full bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="divide-y divide-gray-100">
                        {items.map((item) => (
                            <CartItem key={item.id} item={item} />
                        ))}
                    </div>
                    <div className="p-6 bg-gray-50 border-t border-gray-100 flex justify-between items-center text-sm font-medium">
                        <Link href="/products" className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors">
                            <ArrowLeft className="w-4 h-4" />
                            Continue Shopping
                        </Link>
                    </div>
                </div>

                {/* Order Summary */}
                <div className="lg:w-1/3 w-full">
                    <CheckoutSummary onProceedToPay={handleProceedToPay} />
                </div>
            </div>
        </div>
    );
}
