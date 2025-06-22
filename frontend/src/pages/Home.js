import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon, StarIcon } from '@heroicons/react/24/solid';
import * as productService from '../services/productService';

const Home = () => {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFeaturedProducts = async () => {
            try {
                const response = await productService.getProducts({ page: 0, size: 8 });
                setFeaturedProducts(response.data.content);
            } catch (error) {
                console.error('Error fetching featured products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchFeaturedProducts();
    }, []);

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
                            Welcome to Nonu
                        </h1>
                        <p className="text-xl md:text-2xl mb-8 text-primary-100 max-w-3xl mx-auto animate-slide-up">
                            Discover amazing products at unbeatable prices. Shop the latest trends in electronics, clothing, books, and more.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
                            <Link
                                to="/products"
                                className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center"
                            >
                                Shop Now
                                <ArrowRightIcon className="ml-2 h-5 w-5" />
                            </Link>
                            <Link
                                to="/products?category=Electronics"
                                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors"
                            >
                                Browse Electronics
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Nonu?</h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            We're committed to providing you with the best shopping experience possible.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center p-6">
                            <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Fast Delivery</h3>
                            <p className="text-gray-600">Get your orders delivered quickly and safely to your doorstep.</p>
                        </div>

                        <div className="text-center p-6">
                            <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Quality Products</h3>
                            <p className="text-gray-600">All our products are carefully selected for quality and authenticity.</p>
                        </div>

                        <div className="text-center p-6">
                            <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Secure Payment</h3>
                            <p className="text-gray-600">Your payment information is always safe and secure with us.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Products</h2>
                        <p className="text-lg text-gray-600">Check out our most popular items</p>
                    </div>

                    {loading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[...Array(8)].map((_, index) => (
                                <div key={index} className="card p-4 animate-pulse">
                                    <div className="bg-gray-300 h-48 rounded-lg mb-4"></div>
                                    <div className="h-4 bg-gray-300 rounded mb-2"></div>
                                    <div className="h-4 bg-gray-300 rounded w-2/3 mb-2"></div>
                                    <div className="h-6 bg-gray-300 rounded w-1/3"></div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {featuredProducts.map((product) => (
                                <Link
                                    key={product.id}
                                    to={`/products/${product.id}`}
                                    className="card p-4 hover:shadow-lg transition-shadow group"
                                >
                                    <div className="relative overflow-hidden rounded-lg mb-4">
                                        <img
                                            src={product.imageUrl}
                                            alt={product.name}
                                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
                                        />
                                    </div>
                                    <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                                        {product.name}
                                    </h3>
                                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                                        {product.description}
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-lg font-bold text-primary-600">
                                            ${product.price}
                                        </span>
                                        <div className="flex items-center">
                                            <StarIcon className="h-4 w-4 text-yellow-400" />
                                            <span className="text-sm text-gray-500 ml-1">4.5</span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}

                    <div className="text-center mt-12">
                        <Link
                            to="/products"
                            className="btn-primary inline-flex items-center"
                        >
                            View All Products
                            <ArrowRightIcon className="ml-2 h-5 w-5" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Newsletter Section */}
            <section className="py-16 bg-primary-600">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-white mb-4">Stay Updated</h2>
                    <p className="text-primary-100 mb-8 max-w-2xl mx-auto">
                        Subscribe to our newsletter and be the first to know about new products, special offers, and exclusive deals.
                    </p>
                    <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-4">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="flex-1 px-4 py-2 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-white"
                        />
                        <button className="bg-white text-primary-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                            Subscribe
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home; 