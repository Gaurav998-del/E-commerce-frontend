'use client';

import { ArrowRight, ShieldCheck } from 'lucide-react';
import { useSelector } from 'react-redux';

export default function CheckoutSummary({ onProceedToPay, isProcessing }) {
    const { totalPrice, totalQty } = useSelector((state) => state.cart);

    const taxRate = 0.18; // 18% GST example
    const taxAmount = totalPrice * taxRate;
    const shippingCost = totalPrice > 500 ? 0 : 50;
    const grandTotal = totalPrice + taxAmount + shippingCost;

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

            <div className="space-y-4">
                <div className="flex justify-between text-gray-600">
                    <span>Items ({totalQty}):</span>
                    <span className="font-medium text-gray-900">₹{totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                    <span>Shipping & handling:</span>
                    <span className="font-medium text-gray-900">
                        {shippingCost === 0 ? <span className="text-green-600">Free</span> : `₹${shippingCost.toFixed(2)}`}
                    </span>
                </div>
                <div className="flex justify-between text-gray-600">
                    <span>Estimated Tax (18%):</span>
                    <span className="font-medium text-gray-900">₹{taxAmount.toFixed(2)}</span>
                </div>

                <hr className="my-4 border-gray-100" />

                <div className="flex justify-between items-center bg-gray-50 -mx-6 px-6 py-4 border-y border-gray-100">
                    <span className="text-lg font-bold text-gray-900">Order Total</span>
                    <span className="text-2xl font-black text-blue-600">₹{grandTotal.toFixed(2)}</span>
                </div>
            </div>

            <button
                onClick={() => onProceedToPay(grandTotal)}
                disabled={totalQty === 0 || isProcessing}
                className={`w-full mt-6 py-4 rounded-xl flex items-center justify-center gap-2 font-bold text-lg transition-all ${totalQty === 0 || isProcessing
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg hover:-translate-y-1 active:scale-95'
                    }`}
            >
                {isProcessing ? (
                    <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Processing...
                    </>
                ) : (
                    <>
                        Proceed to Payment <ArrowRight className="w-5 h-5" />
                    </>
                )}
            </button>

            <div className="mt-6 flex items-start gap-3 text-sm text-gray-500 bg-blue-50/50 p-4 rounded-xl">
                <ShieldCheck className="w-8 h-8 text-blue-600 flex-shrink-0" />
                <p>
                    Safe and secure payments. 100% Authentic products. Easy returns within 30 days.
                </p>
            </div>
        </div>
    );
}
