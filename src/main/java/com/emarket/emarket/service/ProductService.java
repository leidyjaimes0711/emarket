package com.emarket.emarket.service;

import com.emarket.emarket.model.Product;
import com.emarket.emarket.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public boolean existsByName(String name) {
        return productRepository.existsByName(name);
    }

    public Product saveProduct(String name, String description, MultipartFile image) {
        // Guardar la imagen en algún lugar (sistema de archivos o base de datos)
        String imageUrl = "";

        Product product = new Product();
        product.setName(name);
        product.setDescription(description);
        product.setImageUrl(imageUrl);

        return productRepository.save(product);
    }
}
