import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import {
    ShoppingCartIcon,
    UserIcon,
    Bars3Icon,
    XMarkIcon,
    MagnifyingGlassIcon
} from '@heroicons/react/24/outline';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const { user, logout, isAuthenticated, isAdmin } = useAuth();
    const { getCartItemCount } = useCart();
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
            setSearchQuery('');
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const cartItemCount = getCartItemCount();

    return (
        <nav className="bg-white shadow-lg sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* Logo and Brand */}
                    <div className="flex items-center">
                        <Link to="/" className="flex-shrink-0 flex items-center">
                            <div className="h-8 w-8 bg-primary-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-lg">N</span>
                            </div>
                            <span className="ml-2 text-xl font-bold text-gray-900">Nonu</span>
                        </Link>
                    </div>

                    {/* Search Bar (Desktop) */}
                    <div className="hidden md:flex items-center flex-1 max-w-lg mx-8">
                        <form onSubmit={handleSearch} className="w-full">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                />
                                <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                            </div>
                        </form>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-4">
                        <Link
                            to="/products"
                            className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                        >
                            Products
                        </Link>

                        {isAuthenticated ? (
                            <>
                                {/* Cart Icon */}
                                <Link
                                    to="/cart"
                                    className="relative text-gray-700 hover:text-primary-600 p-2 rounded-md transition-colors"
                                >
                                    <ShoppingCartIcon className="h-6 w-6" />
                                    {cartItemCount > 0 && (
                                        <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                            {cartItemCount}
                                        </span>
                                    )}
                                </Link>

                                {/* User Menu */}
                                <div className="relative group">
                                    <button className="flex items-center text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                                        <UserIcon className="h-5 w-5 mr-1" />
                                        {user?.firstName}
                                    </button>
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                                        <Link
                                            to="/profile"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            Profile
                                        </Link>
                                        {isAdmin && (
                                            <Link
                                                to="/admin"
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            >
                                                Admin Dashboard
                                            </Link>
                                        )}
                                        <button
                                            onClick={handleLogout}
                                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="btn-primary text-sm"
                                >
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        {isAuthenticated && (
                            <Link
                                to="/cart"
                                className="relative text-gray-700 hover:text-primary-600 p-2 rounded-md transition-colors mr-2"
                            >
                                <ShoppingCartIcon className="h-6 w-6" />
                                {cartItemCount > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                        {cartItemCount}
                                    </span>
                                )}
                            </Link>
                        )}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-gray-700 hover:text-primary-600 p-2"
                        >
                            {isMenuOpen ? (
                                <XMarkIcon className="h-6 w-6" />
                            ) : (
                                <Bars3Icon className="h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            {/* Mobile Search */}
                            <form onSubmit={handleSearch} className="mb-3">
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Search products..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                    />
                                    <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                                </div>
                            </form>

                            <Link
                                to="/products"
                                className="text-gray-700 hover:text-primary-600 block px-3 py-2 rounded-md text-base font-medium"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Products
                            </Link>

                            {isAuthenticated ? (
                                <>
                                    <Link
                                        to="/profile"
                                        className="text-gray-700 hover:text-primary-600 block px-3 py-2 rounded-md text-base font-medium"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Profile
                                    </Link>
                                    {isAdmin && (
                                        <Link
                                            to="/admin"
                                            className="text-gray-700 hover:text-primary-600 block px-3 py-2 rounded-md text-base font-medium"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            Admin Dashboard
                                        </Link>
                                    )}
                                    <button
                                        onClick={() => {
                                            handleLogout();
                                            setIsMenuOpen(false);
                                        }}
                                        className="text-gray-700 hover:text-primary-600 block px-3 py-2 rounded-md text-base font-medium w-full text-left"
                                    >
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link
                                        to="/login"
                                        className="text-gray-700 hover:text-primary-600 block px-3 py-2 rounded-md text-base font-medium"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        to="/register"
                                        className="text-gray-700 hover:text-primary-600 block px-3 py-2 rounded-md text-base font-medium"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Sign Up
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar; 