'use client';

import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../redux/cartSlice';
import { ShoppingBag, Star } from 'lucide-react';

export default function ProductCard({ product }) {
    const dispatch = useDispatch();

    const handleAddToCart = (e) => {
        e.preventDefault(); // Prevent navigating to product details if clicked on button
        dispatch(addItemToCart({ productId: product.id, quantity: 1 }));
    };

    return (
        <div className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
            <Link href={`/products/${product._id}`} className="relative h-64 overflow-hidden bg-gray-50 flex items-center justify-center p-6">
                {/* Placeholder image logic since standard image URLs might mismatch */}
                <img
                    src={product.imageUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(product.name)}&background=random&size=200`}
                    alt={product.name}
                    className="object-contain h-full w-full group-hover:scale-110 transition-transform duration-500"
                />
                {product.countInStock === 0 && (
                    <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                        Out of Stock
                    </div>
                )}
            </Link>

            <div className="p-5 flex flex-col flex-grow">
                <div className="flex items-center gap-1 mb-2">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium text-gray-700">{Math.random().toFixed(1) * 2 + 3}</span>
                    <span className="text-xs text-gray-400">({Math.floor(Math.random() * 200) + 10})</span>
                </div>

                <Link href={`/products/${product._id}`} className="block mt-1">
                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 hover:text-blue-600 transition-colors">
                        {product.name}
                    </h3>
                </Link>
                <p className="mt-2 text-sm text-gray-500 line-clamp-2 mb-4">
                    {product.description}
                </p>

                <div className="mt-auto flex items-center justify-between">
                    <span className="text-xl font-bold text-gray-900">₹{product.price}</span>
                    <button
                        onClick={handleAddToCart}
                        disabled={product.countInStock === 0}
                        className={`p-2.5 rounded-full flex items-center justify-center transition-all ${product.countInStock === 0
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                : 'bg-gray-900 text-white hover:bg-blue-600 hover:shadow-lg hover:-translate-y-1 active:scale-95'
                            }`}
                        aria-label="Add to cart"
                    >
                        <ShoppingBag className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
}
