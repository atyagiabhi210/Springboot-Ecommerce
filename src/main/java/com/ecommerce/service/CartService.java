package com.ecommerce.service;

import com.ecommerce.model.Cart;
import com.ecommerce.model.CartItem;
import com.ecommerce.model.Product;
import com.ecommerce.model.User;
import com.ecommerce.repository.CartRepository;
import com.ecommerce.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.Optional;

@Service
@Transactional
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private ProductRepository productRepository;

    public Cart getOrCreateCart(User user) {
        Optional<Cart> existingCart = cartRepository.findByUserId(user.getId());
        if (existingCart.isPresent()) {
            return existingCart.get();
        } else {
            Cart newCart = new Cart(user);
            return cartRepository.save(newCart);
        }
    }

    public Cart addItemToCart(User user, Long productId, Integer quantity) {
        Cart cart = getOrCreateCart(user);
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + productId));

        // Check if item already exists in cart
        Optional<CartItem> existingItem = cart.getItems().stream()
                .filter(item -> item.getProduct().getId().equals(productId))
                .findFirst();

        if (existingItem.isPresent()) {
            // Update quantity
            CartItem item = existingItem.get();
            item.setQuantity(item.getQuantity() + quantity);
        } else {
            // Add new item
            CartItem newItem = new CartItem(cart, product, quantity);
            cart.addItem(newItem);
        }

        return cartRepository.save(cart);
    }

    public Cart updateItemQuantity(User user, Long productId, Integer quantity) {
        Cart cart = getOrCreateCart(user);
        
        CartItem item = cart.getItems().stream()
                .filter(cartItem -> cartItem.getProduct().getId().equals(productId))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Item not found in cart"));

        if (quantity <= 0) {
            cart.removeItem(item);
        } else {
            item.setQuantity(quantity);
        }

        return cartRepository.save(cart);
    }

    public Cart removeItemFromCart(User user, Long productId) {
        Cart cart = getOrCreateCart(user);
        
        CartItem item = cart.getItems().stream()
                .filter(cartItem -> cartItem.getProduct().getId().equals(productId))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Item not found in cart"));

        cart.removeItem(item);
        return cartRepository.save(cart);
    }

    public void clearCart(User user) {
        Cart cart = getOrCreateCart(user);
        cart.clearItems();
        cartRepository.save(cart);
    }

    public BigDecimal getCartTotal(Cart cart) {
        return cart.getItems().stream()
                .map(item -> item.getProduct().getPrice().multiply(BigDecimal.valueOf(item.getQuantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    public Cart getCartByUser(User user) {
        return getOrCreateCart(user);
    }
} 