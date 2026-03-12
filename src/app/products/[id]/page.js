'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById, clearCurrentProduct } from '../../../redux/productSlice';
import { addItemToCart } from '../../../redux/cartSlice';
import { useParams, useRouter } from 'next/navigation';
import { Star, ShieldCheck, Truck, ArrowLeft, Minus, Plus, ShoppingBag } from 'lucide-react';
import Link from 'next/link';

export default function ProductDetailsPage() {
    const { id } = useParams();
    const router = useRouter();
    const dispatch = useDispatch();
    const { currentProduct: product, isLoading, error } = useSelector((state) => state.products);
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        if (product) {
            setSelectedImage(product.main_image);
        }
    }, [product]);

    useEffect(() => {
        if (id) {
            dispatch(fetchProductById(id));
        }
        return () => {
            dispatch(clearCurrentProduct());
        };
    }, [dispatch, id]);

    const handleAddToCart = () => {
        dispatch(addItemToCart({ productId: product.id, quantity }));
        router.push('/cart');
    };

    if (isLoading) {
        return (
            <div className="animate-pulse max-w-6xl mx-auto py-8">
                <div className="h-8 bg-gray-200 rounded w-32 mb-8"></div>
                <div className="flex flex-col md:flex-row gap-12">
                    <div className="md:w-1/2 h-96 bg-gray-200 rounded-2xl"></div>
                    <div className="md:w-1/2 space-y-6">
                        <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                        <div className="h-24 bg-gray-200 rounded w-full"></div>
                        <div className="h-12 bg-gray-200 rounded w-1/2"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="text-center py-20">
                <p className="text-red-500 mb-4">{error || 'Product not found'}</p>
                <button onClick={() => router.back()} className="text-blue-600 hover:underline">
                    Go Back
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto py-8">
            <Link href="/products" className="inline-flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors mb-8 group">
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Back to Products
            </Link>

            <div className="flex flex-col md:flex-row gap-12 bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-gray-100">
                {/* Product Image & Gallery */}
                <div className="md:w-1/2 flex flex-col gap-4">
                    <div className="flex items-center justify-center bg-gray-50 rounded-2xl p-8 border border-gray-100 h-96 relative overflow-hidden group">
                        <img
                            src={selectedImage || product.main_image || `https://ui-avatars.com/api/?name=${encodeURIComponent(product.name)}&background=random&size=400`}
                            alt={product.name}
                            className="w-full h-full object-contain mix-blend-multiply drop-shadow-xl transition-transform duration-300 group-hover:scale-105"
                        />
                    </div>
                    {product.images && product.images.length > 0 && (
                        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-200">
                            {/* Main Image Thumbnail */}
                            {product.main_image && !product.images.includes(product.main_image) && (
                                <button
                                    onClick={() => setSelectedImage(product.main_image)}
                                    className={`flex-shrink-0 w-20 h-20 rounded-xl border-2 overflow-hidden bg-gray-50 transition-all ${selectedImage === product.main_image ? 'border-blue-600 shadow-md transform scale-105' : 'border-transparent hover:border-gray-200'
                                        }`}
                                >
                                    <img
                                        src={product.main_image}
                                        alt="Main Thumbnail"
                                        className="w-full h-full object-cover mix-blend-multiply"
                                    />
                                </button>
                            )}
                            {/* Additional Images */}
                            {product.images.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setSelectedImage(img)}
                                    className={`flex-shrink-0 w-20 h-20 rounded-xl border-2 overflow-hidden bg-gray-50 transition-all ${selectedImage === img ? 'border-blue-600 shadow-md transform scale-105' : 'border-transparent hover:border-gray-200'
                                        }`}
                                >
                                    <img
                                        src={img}
                                        alt={`Thumbnail ${idx + 1}`}
                                        className="w-full h-full object-cover mix-blend-multiply"
                                    />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Product Details */}
                <div className="md:w-1/2 flex flex-col">
                    <div className="flex items-center gap-2 mb-3">
                        <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2.5 py-1 rounded select-none">
                            {product.category || 'Premium'}
                        </span>
                        <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium text-gray-700">{product.rating || '4.8'}</span>
                        </div>
                    </div>

                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                        {product.name}
                    </h1>

                    <div className="flex items-baseline gap-4 mb-6">
                        <span className="text-4xl font-black text-blue-600">₹{product.price}</span>
                        <span className="text-lg text-gray-400 line-through decoration-1">
                            ₹{(product.price * 1.2).toFixed(2)}
                        </span>
                    </div>

                    <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                        {product.description}
                    </p>

                    <hr className="border-gray-100 mb-8" />

                    {/* Action Area */}
                    <div className="flex flex-col sm:flex-row gap-6 mb-8">
                        <div className="flex items-center bg-gray-50 rounded-xl border border-gray-200 p-1">
                            <button
                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                className="p-3 text-gray-600 hover:bg-white rounded-lg hover:shadow-sm transition-all"
                                disabled={quantity <= 1}
                            >
                                <Minus className="w-5 h-5" />
                            </button>
                            <span className="w-16 flex justify-center text-lg font-bold text-gray-900">
                                {quantity}
                            </span>
                            <button
                                onClick={() => setQuantity(Math.min(product.countInStock || 10, quantity + 1))}
                                className="p-3 text-gray-600 hover:bg-white rounded-lg hover:shadow-sm transition-all"
                                disabled={quantity >= (product.countInStock || 10)}
                            >
                                <Plus className="w-5 h-5" />
                            </button>
                        </div>

                        <button
                            onClick={handleAddToCart}
                            disabled={product.countInStock === 0}
                            className={`flex-1 flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-lg transition-all ${product.countInStock === 0
                                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-200 hover:-translate-y-0.5 active:scale-95'
                                }`}
                        >
                            <ShoppingBag className="w-5 h-5" />
                            {product.countInStock === 0 ? 'Out of Stock' : 'Add to Cart'}
                        </button>
                    </div>

                    {/* Features */}
                    <div className="grid grid-cols-2 gap-4 mt-auto">
                        <div className="flex items-center gap-3 p-4 bg-green-50/50 rounded-xl border border-green-100 text-green-800">
                            <ShieldCheck className="w-6 h-6 flex-shrink-0 text-green-600" />
                            <span className="font-medium text-sm">1 Year Warranty<br />Included</span>
                        </div>
                        <div className="flex items-center gap-3 p-4 bg-purple-50/50 rounded-xl border border-purple-100 text-purple-800">
                            <Truck className="w-6 h-6 flex-shrink-0 text-purple-600" />
                            <span className="font-medium text-sm">Free Delivery<br />on orders &gt; ₹500</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
