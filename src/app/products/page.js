'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../redux/productSlice';
import ProductCard from '../../components/ProductCard';
import { LayoutGrid, SlidersHorizontal } from 'lucide-react';

export default function ProductsPage() {
    const dispatch = useDispatch();
    const { items: products, isLoading, error } = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(fetchProducts({}));
    }, [dispatch]);

    return (
        <div className="py-6">
            {/* Header & Controls */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">All Products</h1>
                    <p className="text-gray-500 mt-1">Showing {products?.length || 0} results</p>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="bg-white border border-gray-200 rounded-lg p-1.5 flex text-gray-500 hidden sm:flex">
                        <button className="p-1.5 bg-gray-100 rounded shadow-sm text-gray-900">
                            <LayoutGrid className="w-5 h-5" />
                        </button>
                    </div>
                    <button className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors flex-grow md:flex-grow-0 justify-center">
                        <SlidersHorizontal className="w-4 h-4" />
                        Filters
                    </button>
                    <select className="bg-white border border-gray-200 px-4 py-2 rounded-lg font-medium text-gray-700 hover:bg-gray-50 outline-none focus:ring-2 focus:ring-blue-500 flex-grow md:flex-grow-0 cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23131313%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:10px_10px] bg-no-repeat bg-[position:right_1rem_center] pr-10">
                        <option>Featured</option>
                        <option>Price: Low to High</option>
                        <option>Price: High to Low</option>
                        <option>Newest Arrivals</option>
                    </select>
                </div>
            </div>

            {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-pulse">
                    {[...Array(8)].map((_, i) => (
                        <div key={i} className="animate-pulse bg-white rounded-2xl h-96 border border-gray-100">
                            <div className="h-64 bg-gray-200 rounded-t-2xl"></div>
                            <div className="p-5 space-y-4">
                                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : error ? (
                <div className="text-center py-20 bg-red-50 rounded-2xl border border-red-100">
                    <p className="text-red-500 font-medium">Failed to load products: {error}</p>
                </div>
            ) : products?.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
                    <p className="text-gray-500 text-lg">No products found.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {products?.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
}
