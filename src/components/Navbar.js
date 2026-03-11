'use client';

import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { ShoppingCart, User, LogOut, Package } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { logout } from '../redux/authSlice';
import { clearCart } from '../redux/cartSlice';

export default function Navbar() {
    const { totalQty } = useSelector((state) => state.cart);
    const { isAuthenticated, user } = useAuth();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
        dispatch(clearCart());
    };

    return (
        <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-200 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="bg-blue-600 p-2 rounded-xl group-hover:rotate-12 transition-transform duration-300">
                            <Package className="h-6 w-6 text-white" />
                        </div>
                        <span className="font-bold text-xl tracking-tight text-gray-900">
                            Lumina<span className="text-blue-600">Cart</span>
                        </span>
                    </Link>

                    {/* Navigation Links */}
                    <div className="hidden md:flex space-x-8">
                        <Link href="/products" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
                            Shop
                        </Link>
                        <Link href="/" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
                            Categories
                        </Link>
                        <Link href="/" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
                            Deals
                        </Link>
                    </div>

                    {/* Right side actions */}
                    <div className="flex items-center space-x-6">
                        <Link href="/cart" className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors group">
                            <ShoppingCart className="h-6 w-6 group-hover:scale-110 transition-transform" />
                            {totalQty > 0 && (
                                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-500 rounded-full animate-pulse-once">
                                    {totalQty}
                                </span>
                            )}
                        </Link>

                        {isAuthenticated ? (
                            <div className="flex items-center gap-4">
                                <div className="hidden sm:flex items-center gap-2 text-sm font-medium text-gray-700">
                                    <User className="h-4 w-4" />
                                    <span>{user?.name || 'User'}</span>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="p-2 text-gray-600 hover:text-red-600 transition-colors group flex items-center gap-1"
                                    title="Logout"
                                >
                                    <LogOut className="h-5 w-5 group-hover:scale-110 transition-transform" />
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-4">
                                <Link href="/login" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
                                    Log in
                                </Link>
                                <Link
                                    href="/register"
                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-200 transition-all active:scale-95"
                                >
                                    Sign up
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
