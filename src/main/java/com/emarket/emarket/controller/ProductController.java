package com.emarket.emarket.controller;

import com.emarket.emarket.model.Room;
import com.emarket.emarket.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;
@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:3000") // Permitir solicitudes desde el frontend React
public class ProductController {

    @Autowired
    private RoomService roomService;

    @PostMapping
    public ResponseEntity<?> createProduct(
            @RequestParam("name") String name,
            @RequestParam("description") String description,
            @RequestParam("image") MultipartFile image) {


        return null;
    }
}