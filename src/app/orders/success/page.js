'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle2, ChevronRight, Package, Truck, Download } from 'lucide-react';

function OrderSuccessContent() {
    const searchParams = useSearchParams();
    const orderId = searchParams.get('orderId') || 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase();

    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center py-12 px-4 max-w-3xl mx-auto text-center">
            <div className="relative mb-8">
                <div className="absolute -inset-4 bg-green-100 rounded-full animate-pulse-once opacity-50 blur-lg"></div>
                <CheckCircle2 className="relative w-24 h-24 text-green-500 drop-shadow-lg" />
            </div>

            <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">Order Confirmed!</h1>
            <p className="text-xl text-gray-600 mb-2">
                Thank you for shopping with LuminaCart.
            </p>
            <p className="text-gray-500 mb-10">
                Your order <span className="font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">#{orderId}</span> has been successfully placed.
            </p>

            <div className="w-full bg-white border border-gray-100 shadow-sm rounded-3xl p-8 mb-10 text-left relative overflow-hidden">
                {/* Decorative corner accent */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -z-10 opacity-50"></div>

                <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <Package className="w-5 h-5 text-blue-600" /> What's next?
                </h3>

                <div className="space-y-6 relative before:absolute before:inset-0 before:ml-[1.4rem] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-blue-200 before:via-gray-100 before:to-transparent">

                    <div className="relative flex items-start gap-6 md:justify-center">
                        <div className="absolute left-0 w-12 flex justify-center md:left-1/2 md:-ml-6 z-10">
                            <div className="bg-blue-600 rounded-full border-4 border-white shadow shadow-blue-200 w-5 h-5 flex items-center justify-center"></div>
                        </div>
                        <div className="ml-16 md:ml-0 md:w-1/2 md:pr-12 md:text-right">
                            <h4 className="font-bold text-gray-900">Order Processing</h4>
                            <p className="text-sm text-gray-500 mt-1">We are preparing your items for shipment.</p>
                        </div>
                        <div className="hidden md:block w-1/2 self-center"></div>
                    </div>

                    <div className="relative flex items-start gap-6 md:justify-center">
                        <div className="absolute left-0 w-12 flex justify-center md:left-1/2 md:-ml-6 z-10">
                            <div className="bg-gray-200 rounded-full border-4 border-white w-5 h-5 flex items-center justify-center"></div>
                        </div>
                        <div className="hidden md:block w-1/2 self-center"></div>
                        <div className="ml-16 md:ml-0 md:w-1/2 md:pl-12 text-left">
                            <h4 className="font-bold text-gray-400">Shipped</h4>
                            <p className="text-sm text-gray-400 mt-1 border-gray-100">Handed over to delivery partner.</p>
                        </div>
                    </div>

                </div>

                <div className="mt-8 pt-6 border-t border-gray-100 flex justify-between items-center sm:hidden">
                    <button className="text-sm font-medium text-blue-600 flex items-center gap-1">
                        <Download className="w-4 h-4" /> Receipt
                    </button>
                    <span className="text-gray-400 text-sm">ETA: 3-5 Days</span>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                <Link
                    href="/products"
                    className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-700 hover:shadow-lg hover:-translate-y-0.5 active:scale-95 transition-all text-center"
                >
                    Continue Shopping
                </Link>
            </div>
        </div>
    );
}

export default function OrderSuccessPage() {
    return (
        <Suspense fallback={<div className="min-h-[70vh] flex items-center justify-center"><div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div></div>}>
            <OrderSuccessContent />
        </Suspense>
    );
}
