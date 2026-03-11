'use client';

import { useDispatch } from 'react-redux';
import { updateItemInCart, removeItemFromCart } from '../redux/cartSlice';
import { Minus, Plus, Trash2 } from 'lucide-react';
import Link from 'next/link';

export default function CartItem({ item }) {
    const dispatch = useDispatch();
    const product = item.product; // assuming the populated product object is nested

    const handleUpdateQuantity = (newQuantity) => {
        if (newQuantity > 0 && newQuantity <= (product.countInStock || 10)) {
            dispatch(updateItemInCart({ productId: product._id, quantity: newQuantity }));
        }
    };

    const handleRemove = () => {
        dispatch(removeItemFromCart(product._id));
    };

    if (!product) return null;

    return (
        <div className="flex flex-col sm:flex-row items-center gap-6 p-6 border-b border-gray-100 bg-white hover:bg-gray-50 transition-colors">
            <Link href={`/products/${product._id}`} className="w-32 h-32 flex-shrink-0 rounded-xl overflow-hidden bg-white border border-gray-100 p-2">
                <img
                    src={product.imageUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(product.name)}&background=random`}
                    alt={product.name}
                    className="w-full h-full object-contain mix-blend-multiply"
                />
            </Link>

            <div className="flex-grow flex flex-col self-start w-full">
                <div className="flex justify-between items-start">
                    <Link href={`/products/${product._id}`}>
                        <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors line-clamp-2 border-b-2 border-transparent hover:border-blue-600 inline-block">
                            {product.name}
                        </h3>
                    </Link>
                    <span className="text-lg font-bold text-gray-900 ml-4 whitespace-nowrap">₹{product.price * item.quantity}</span>
                </div>

                <p className="mt-1 text-sm text-gray-500">₹{product.price} each</p>

                <div className="flex items-center justify-between w-full mt-4">
                    <div className="flex items-center rounded-lg border border-gray-200 bg-white p-1">
                        <button
                            onClick={() => handleUpdateQuantity(item.quantity - 1)}
                            className="p-1 rounded-md hover:bg-gray-100 text-gray-600 transition-colors active:scale-95"
                            disabled={item.quantity <= 1}
                        >
                            <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-10 text-center text-sm font-medium text-gray-900">
                            {item.quantity}
                        </span>
                        <button
                            onClick={() => handleUpdateQuantity(item.quantity + 1)}
                            className="p-1 rounded-md hover:bg-gray-100 text-gray-600 transition-colors active:scale-95"
                            disabled={item.quantity >= (product.countInStock || 10)}
                        >
                            <Plus className="w-4 h-4" />
                        </button>
                    </div>

                    <button
                        onClick={handleRemove}
                        className="flex items-center gap-1.5 text-sm font-medium text-red-500 hover:text-red-600 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors"
                    >
                        <Trash2 className="w-4 h-4" />
                        <span>Remove</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
