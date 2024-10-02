package com.emarket.emarket.controller;

import com.emarket.emarket.model.Product;
import com.emarket.emarket.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:3000")
public class ProductController {

    @Autowired
    private ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @PostMapping
    public ResponseEntity<?> createProduct(
            @RequestParam("name") String name,
            @RequestParam("description") String description,
            @RequestParam("image") MultipartFile image) {

        // Validar si el nombre ya existe
        if (productService.existsByName(name)) {
            return ResponseEntity.badRequest().body(Map.of("message", "El nombre del producto ya está en uso"));
        }

        // Guardar el producto
        Product product = productService.saveProduct(name, description, image);
        return ResponseEntity.ok(product);
    }
}
