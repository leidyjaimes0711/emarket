package com.dh.emarket.service;


import com.dh.emarket.model.Image;
import com.dh.emarket.model.Room;
import com.dh.emarket.repository.ImageRepository;
import com.dh.emarket.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class ImageService {

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private ImageRepository imageRepository;

    // Método para agregar una imagen a una habitación
    public Room addImageToRoom(Long roomId, MultipartFile file) throws IOException {
        // Buscar la habitación por ID
        Room room = roomRepository.findById(roomId).orElseThrow(() -> new RuntimeException("Room not found"));

        // Crear la entidad Image
        Image image = new Image();
        image.setFileName(file.getOriginalFilename());
        image.setFileType(file.getContentType());
        image.setData(file.getBytes());
        image.setRoom(room);

        // Agregar la imagen a la lista de imágenes de la habitación
        room.getImages().add(image);

        // Guardar la habitación con la nueva imagen
        return roomRepository.save(room);
    }
}