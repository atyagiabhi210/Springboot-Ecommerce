package com.ecommerce.controller;

import com.ecommerce.model.Cart;
import com.ecommerce.model.User;
import com.ecommerce.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.Map;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/cart")
@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
public class CartController {

    @Autowired
    private CartService cartService;

    @GetMapping
    public ResponseEntity<Cart> getCart(Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        Cart cart = cartService.getCartByUser(user);
        return ResponseEntity.ok(cart);
    }

    @PostMapping("/add")
    public ResponseEntity<Cart> addItemToCart(
            @RequestBody Map<String, Object> request,
            Authentication authentication) {
        
        User user = (User) authentication.getPrincipal();
        Long productId = Long.valueOf(request.get("productId").toString());
        Integer quantity = Integer.valueOf(request.get("quantity").toString());

        try {
            Cart cart = cartService.addItemToCart(user, productId, quantity);
            return ResponseEntity.ok(cart);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/update")
    public ResponseEntity<Cart> updateItemQuantity(
            @RequestBody Map<String, Object> request,
            Authentication authentication) {
        
        User user = (User) authentication.getPrincipal();
        Long productId = Long.valueOf(request.get("productId").toString());
        Integer quantity = Integer.valueOf(request.get("quantity").toString());

        try {
            Cart cart = cartService.updateItemQuantity(user, productId, quantity);
            return ResponseEntity.ok(cart);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/remove/{productId}")
    public ResponseEntity<Cart> removeItemFromCart(
            @PathVariable Long productId,
            Authentication authentication) {
        
        User user = (User) authentication.getPrincipal();

        try {
            Cart cart = cartService.removeItemFromCart(user, productId);
            return ResponseEntity.ok(cart);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/clear")
    public ResponseEntity<?> clearCart(Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        cartService.clearCart(user);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/total")
    public ResponseEntity<BigDecimal> getCartTotal(Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        Cart cart = cartService.getCartByUser(user);
        BigDecimal total = cartService.getCartTotal(cart);
        return ResponseEntity.ok(total);
    }
} 