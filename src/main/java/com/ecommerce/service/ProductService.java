package com.ecommerce.service;

import com.ecommerce.model.Product;
import com.ecommerce.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public Page<Product> getAllProducts(Pageable pageable) {
        return productRepository.findAll(pageable);
    }

    public Page<Product> getAvailableProducts(Pageable pageable) {
        return productRepository.findAvailableProducts(pageable);
    }

    public Optional<Product> getProductById(Long id) {
        return productRepository.findById(id);
    }

    public Page<Product> searchProducts(String name, String category, Pageable pageable) {
        if (name != null && category != null) {
            return productRepository.findByCategoryAndNameContainingIgnoreCase(category, name, pageable);
        } else if (name != null) {
            return productRepository.findByNameContainingIgnoreCase(name, pageable);
        } else if (category != null) {
            return productRepository.findByCategory(category, pageable);
        } else {
            return productRepository.findAll(pageable);
        }
    }

    public List<String> getAllCategories() {
        return productRepository.findAllCategories();
    }

    public Product createProduct(Product product) {
        return productRepository.save(product);
    }

    public Product updateProduct(Long id, Product productDetails) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));

        product.setName(productDetails.getName());
        product.setDescription(productDetails.getDescription());
        product.setPrice(productDetails.getPrice());
        product.setStockQuantity(productDetails.getStockQuantity());
        product.setImageUrl(productDetails.getImageUrl());
        product.setCategory(productDetails.getCategory());

        return productRepository.save(product);
    }

    public void deleteProduct(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));
        productRepository.delete(product);
    }

    public boolean isProductAvailable(Long productId, Integer quantity) {
        Optional<Product> product = productRepository.findById(productId);
        return product.isPresent() && product.get().getStockQuantity() >= quantity;
    }

    public void updateStock(Long productId, Integer quantity) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + productId));
        
        if (product.getStockQuantity() < quantity) {
            throw new RuntimeException("Insufficient stock");
        }
        
        product.setStockQuantity(product.getStockQuantity() - quantity);
        productRepository.save(product);
    }
} 