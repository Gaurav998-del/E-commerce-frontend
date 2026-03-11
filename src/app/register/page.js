'use client';

import { useState, useEffect, Suspense } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser, clearError } from '../../redux/authSlice';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { UserPlus, Mail, Lock, User, AlertCircle } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

function RegisterContent() {
    const [userData, setUserData] = useState({ name: '', email: '', password: '' });
    const dispatch = useDispatch();
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirect = searchParams.get('redirect') || '/';

    const { isAuthenticated, isLoading, error } = useAuth();

    useEffect(() => {
        dispatch(clearError());
    }, [dispatch]);

    useEffect(() => {
        if (isAuthenticated) {
            router.push(redirect);
        }
    }, [isAuthenticated, router, redirect]);

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(registerUser(userData));
    };

    return (
        <div className="min-h-[80vh] flex flex-row-reverse">
            {/* Right side Form (Reversed layout for variety) */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-24 bg-white">
                <div className="w-full max-w-md">
                    <div className="mb-10 text-center">
                        <h1 className="text-3xl font-black text-gray-900 tracking-tight">Create an account</h1>
                        <p className="text-gray-500 mt-2">Join us and start shopping in style.</p>
                    </div>

                    {error && (
                        <div className="mb-6 bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl flex items-center gap-3 animate-pulse-once">
                            <AlertCircle className="w-5 h-5 flex-shrink-0" />
                            <p className="text-sm font-medium">{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">Full Name</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <User className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    name="name"
                                    value={userData.name}
                                    onChange={handleChange}
                                    placeholder="John Doe"
                                    required
                                    className="input-field pl-11 shadow-sm"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">Email Address</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="email"
                                    name="email"
                                    value={userData.email}
                                    onChange={handleChange}
                                    placeholder="Enter your email"
                                    required
                                    className="input-field pl-11 shadow-sm"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">Password</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="password"
                                    name="password"
                                    value={userData.password}
                                    onChange={handleChange}
                                    placeholder="Create a strong password"
                                    required
                                    className="input-field pl-11 shadow-sm"
                                    minLength={6}
                                />
                            </div>
                            <p className="text-xs text-gray-500 mt-2 ml-1">Must be at least 6 characters long.</p>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full py-4 rounded-xl flex items-center justify-center gap-2 font-bold text-lg transition-all shadow-md active:scale-95 ${isLoading
                                    ? 'bg-blue-400 text-white cursor-not-allowed'
                                    : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-200 hover:-translate-y-0.5'
                                }`}
                        >
                            {isLoading ? (
                                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>Create Account <UserPlus className="w-5 h-5" /></>
                            )}
                        </button>
                    </form>

                    <p className="mt-8 text-center text-sm text-gray-600">
                        Already have an account?{' '}
                        <Link href={`/login${redirect !== '/' ? `?redirect=${redirect}` : ''}`} className="font-semibold text-blue-600 hover:text-blue-700 transition-colors">
                            Log in instead
                        </Link>
                    </p>
                </div>
            </div>

            {/* Left side Visual */}
            <div className="hidden lg:flex w-1/2 relative bg-emerald-900 rounded-3xl m-4 overflow-hidden shadow-2xl items-center justify-center border-8 border-white">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/50 to-teal-900/50 mix-blend-multiply z-10"></div>
                <img
                    src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1000"
                    alt="Premium Shopping"
                    className="absolute inset-0 w-full h-full object-cover transform scale-105 hover:scale-100 transition-transform duration-[10s]"
                />
                <div className="relative z-20 text-center px-12">
                    <h2 className="text-5xl font-black text-white mb-6 drop-shadow-md tracking-tight">Unlock Exclusive<br />Benefits</h2>
                    <p className="text-xl text-emerald-50 font-medium max-w-sm mx-auto drop-shadow-sm leading-relaxed">
                        Track your orders, save your favorites, and get personalized recommendations.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default function RegisterPage() {
    return (
        <Suspense fallback={<div className="min-h-[80vh] flex items-center justify-center"><div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div></div>}>
            <RegisterContent />
        </Suspense>
    );
}
