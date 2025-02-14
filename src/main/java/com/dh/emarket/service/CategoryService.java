package com.dh.emarket.service;

import com.dh.emarket.model.Category;
import com.dh.emarket.repository.CategoryRepository;
import com.dh.emarket.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;


    // Método crear una categoría
    public Category createCategory(String name) {
        if (categoryRepository.findByName(name).isPresent()) {
            throw new RuntimeException("Category already exists");
        }
        Category category = new Category();
        category.setName(name);
        return categoryRepository.save(category);
    }

    // Método eliminar una categoria
    public void deleteCategory(Long id) {
        categoryRepository.deleteById(id);
    }

}
