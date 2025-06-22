import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import * as authService from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('user');

        if (token && userData) {
            try {
                setUser(JSON.parse(userData));
                authService.setAuthToken(token);
            } catch (error) {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
            }
        }
        setLoading(false);
    }, []);

    const login = async (credentials) => {
        try {
            const response = await authService.login(credentials);
            const { token, ...userData } = response.data;

            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(userData));
            authService.setAuthToken(token);
            setUser(userData);

            toast.success('Login successful!');
            return { success: true };
        } catch (error) {
            const message = error.response?.data || 'Login failed';
            toast.error(message);
            return { success: false, error: message };
        }
    };

    const register = async (userData) => {
        try {
            await authService.register(userData);
            toast.success('Registration successful! Please login.');
            return { success: true };
        } catch (error) {
            const message = error.response?.data || 'Registration failed';
            toast.error(message);
            return { success: false, error: message };
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        authService.removeAuthToken();
        setUser(null);
        toast.success('Logged out successfully');
    };

    const value = {
        user,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'ADMIN'
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}; 