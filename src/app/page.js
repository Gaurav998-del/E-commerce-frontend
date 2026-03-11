'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/productSlice';
import ProductCard from '../components/ProductCard';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function Home() {
  const dispatch = useDispatch();
  const { items: products, isLoading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts({ limit: 8 })); // Fetch top 8 products for home page
  }, [dispatch]);

  return (
    <div className="flex flex-col gap-16 pb-12">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 rounded-3xl overflow-hidden mt-6">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20 mix-blend-overlay"></div>
        <div className="relative px-8 md:px-16 py-20 lg:py-32 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="md:w-1/2 space-y-8 z-10 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white backdrop-blur-md border border-white/20">
              <Sparkles className="w-4 h-4 text-blue-300" />
              <span className="text-sm font-medium">New Summer Collection</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white leading-tight">
              Elevate Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-teal-200">
                Lifestyle Today
              </span>
            </h1>
            <p className="text-lg text-blue-100 max-w-xl mx-auto md:mx-0">
              Discover the finest collection of premium products curated just for you. Quality meets elegance in every item we offer.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link href="/products" className="bg-white text-blue-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-blue-900/50">
                Shop Now
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 relative z-10 hidden md:block">
            {/* Abstract decorative element for hero */}
            <div className="relative w-full aspect-square max-w-md mx-auto">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-400 to-teal-300 rounded-full blur-3xl opacity-30 animate-pulse"></div>
              <img
                src="https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&q=80&w=600"
                alt="Premium Shoes Component"
                className="relative z-10 w-full h-full object-cover rounded-3xl shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500 border-4 border-white/10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section>
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Trending Now</h2>
            <p className="text-gray-500 mt-2">Our most popular selections this week</p>
          </div>
          <Link href="/products" className="hidden sm:flex items-center gap-1 text-blue-600 font-medium hover:text-blue-700 group">
            View All <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse bg-white rounded-2xl h-96 border border-gray-100">
                <div className="h-64 bg-gray-200 rounded-t-2xl"></div>
                <div className="p-5 space-y-4">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="flex justify-between items-center pt-4">
                    <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products?.slice(0, 8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        <div className="mt-8 sm:hidden flex justify-center">
          <Link href="/products" className="btn-primary w-full max-w-xs">
            View All Products
          </Link>
        </div>
      </section>
    </div>
  );
}
