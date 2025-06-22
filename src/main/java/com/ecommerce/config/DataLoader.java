package com.ecommerce.config;

import com.ecommerce.model.Product;
import com.ecommerce.model.User;
import com.ecommerce.repository.ProductRepository;
import com.ecommerce.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

@Component
public class DataLoader implements CommandLineRunner {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        loadUsers();
        loadProducts();
    }

    private void loadUsers() {
        if (userRepository.count() == 0) {
            // Create admin user
            User admin = new User();
            admin.setUsername("admin");
            admin.setEmail("admin@example.com");
            admin.setFirstName("Admin");
            admin.setLastName("User");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setRole(User.Role.ADMIN);
            userRepository.save(admin);

            // Create test user
            User user = new User();
            user.setUsername("user");
            user.setEmail("user@example.com");
            user.setFirstName("Test");
            user.setLastName("User");
            user.setPassword(passwordEncoder.encode("user123"));
            user.setRole(User.Role.USER);
            userRepository.save(user);

            System.out.println("Sample users created:");
            System.out.println("Admin - username: admin, password: admin123");
            System.out.println("User - username: user, password: user123");
        }
    }

    private void loadProducts() {
        if (productRepository.count() == 0) {
            // Electronics
            productRepository.save(new Product("iPhone 15 Pro", "Latest Apple smartphone with advanced features", new BigDecimal("999.99"), 50, "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500", "Electronics"));
            productRepository.save(new Product("MacBook Air M2", "Powerful and lightweight laptop for professionals", new BigDecimal("1199.99"), 30, "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=500", "Electronics"));
            productRepository.save(new Product("Samsung Galaxy Watch", "Smart watch with health monitoring features", new BigDecimal("299.99"), 75, "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500", "Electronics"));
            productRepository.save(new Product("Sony WH-1000XM4", "Noise-canceling wireless headphones", new BigDecimal("349.99"), 40, "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500", "Electronics"));

            // Clothing
            productRepository.save(new Product("Classic White T-Shirt", "100% cotton comfortable white t-shirt", new BigDecimal("19.99"), 100, "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500", "Clothing"));
            productRepository.save(new Product("Denim Jeans", "High-quality denim jeans with modern fit", new BigDecimal("79.99"), 60, "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500", "Clothing"));
            productRepository.save(new Product("Leather Jacket", "Premium leather jacket for style and comfort", new BigDecimal("199.99"), 25, "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500", "Clothing"));
            productRepository.save(new Product("Running Shoes", "Lightweight running shoes with excellent support", new BigDecimal("129.99"), 80, "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500", "Clothing"));

            // Home & Garden
            productRepository.save(new Product("Coffee Maker", "Programmable coffee maker with thermal carafe", new BigDecimal("89.99"), 35, "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500", "Home & Garden"));
            productRepository.save(new Product("Garden Plant Set", "Beautiful indoor plants to brighten your home", new BigDecimal("34.99"), 90, "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=500", "Home & Garden"));
            productRepository.save(new Product("LED Desk Lamp", "Adjustable LED desk lamp with USB charging", new BigDecimal("45.99"), 55, "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500", "Home & Garden"));
            productRepository.save(new Product("Throw Pillow Set", "Decorative throw pillows for living room", new BigDecimal("29.99"), 70, "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500", "Home & Garden"));

            // Books
            productRepository.save(new Product("The Art of Programming", "Comprehensive guide to software development", new BigDecimal("49.99"), 45, "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500", "Books"));
            productRepository.save(new Product("Cooking Masterclass", "Learn professional cooking techniques at home", new BigDecimal("32.99"), 65, "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=500", "Books"));
            productRepository.save(new Product("Travel Photography", "Capture stunning photos on your adventures", new BigDecimal("27.99"), 40, "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=500", "Books"));

            System.out.println("Sample products loaded successfully!");
        }
    }
} 