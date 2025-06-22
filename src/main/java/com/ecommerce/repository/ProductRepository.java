package com.ecommerce.repository;

import com.ecommerce.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    Page<Product> findByNameContainingIgnoreCase(String name, Pageable pageable);
    Page<Product> findByCategory(String category, Pageable pageable);
    Page<Product> findByCategoryAndNameContainingIgnoreCase(String category, String name, Pageable pageable);
    
    @Query("SELECT DISTINCT p.category FROM Product p")
    List<String> findAllCategories();
    
    @Query("SELECT p FROM Product p WHERE p.stockQuantity > 0")
    Page<Product> findAvailableProducts(Pageable pageable);
} 