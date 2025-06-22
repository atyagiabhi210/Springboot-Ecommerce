import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import * as cartService from '../services/cartService';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(false);
    const { user, isAuthenticated } = useAuth();

    const fetchCart = async () => {
        if (!isAuthenticated) {
            setCart(null);
            return;
        }

        try {
            setLoading(true);
            const response = await cartService.getCart();
            setCart(response.data);
        } catch (error) {
            console.error('Error fetching cart:', error);
            setCart(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCart();
    }, [isAuthenticated]);

    const addToCart = async (productId, quantity = 1) => {
        if (!isAuthenticated) {
            toast.error('Please login to add items to cart');
            return;
        }

        try {
            setLoading(true);
            const response = await cartService.addToCart(productId, quantity);
            setCart(response.data);
            toast.success('Item added to cart!');
            return { success: true };
        } catch (error) {
            const message = error.response?.data?.message || 'Failed to add item to cart';
            toast.error(message);
            return { success: false, error: message };
        } finally {
            setLoading(false);
        }
    };

    const updateQuantity = async (productId, quantity) => {
        try {
            setLoading(true);
            const response = await cartService.updateQuantity(productId, quantity);
            setCart(response.data);
            toast.success('Cart updated!');
        } catch (error) {
            toast.error('Failed to update cart');
        } finally {
            setLoading(false);
        }
    };

    const removeFromCart = async (productId) => {
        try {
            setLoading(true);
            const response = await cartService.removeFromCart(productId);
            setCart(response.data);
            toast.success('Item removed from cart');
        } catch (error) {
            toast.error('Failed to remove item from cart');
        } finally {
            setLoading(false);
        }
    };

    const clearCart = async () => {
        try {
            setLoading(true);
            await cartService.clearCart();
            setCart(null);
            toast.success('Cart cleared');
        } catch (error) {
            toast.error('Failed to clear cart');
        } finally {
            setLoading(false);
        }
    };

    const getCartTotal = () => {
        if (!cart || !cart.items) return 0;
        return cart.items.reduce((total, item) => {
            return total + (item.product.price * item.quantity);
        }, 0);
    };

    const getCartItemCount = () => {
        if (!cart || !cart.items) return 0;
        return cart.items.reduce((count, item) => count + item.quantity, 0);
    };

    const value = {
        cart,
        loading,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        fetchCart,
        getCartTotal,
        getCartItemCount
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
}; 