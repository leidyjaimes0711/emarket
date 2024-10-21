package com.dh.emarket.service;


import com.dh.emarket.dto.ImageDTO;
import com.dh.emarket.model.Image;
import com.dh.emarket.model.Room;
import com.dh.emarket.repository.ImageRepository;
import com.dh.emarket.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

@Service
public class ImageService {

    // Atributos
    @Autowired
    private ImageRepository imageRepository;

    @Autowired
    private RoomRepository roomRepository;

    // Métodos
    public List<ImageDTO> getImagesByRoom(Long roomId) {
        List<Image> images = imageRepository.findByRoomId(roomId); // Obtener imágenes por habitación
        List<ImageDTO> imageDTOs = new ArrayList<>();

        for (Image image : images) {
            ImageDTO dto = new ImageDTO();
            dto.setId(image.getId());
            dto.setFileName(image.getFileName());
            dto.setFileType(image.getFileType());
            dto.setDataBase64(Base64.getEncoder().encodeToString(image.getData())); // Convertir a base64
            imageDTOs.add(dto);
        }

        return imageDTOs;
    }

    // Método para agregar una imagen a una habitación
    public Room addImageToRoom(Long roomId, MultipartFile file) throws IOException {
        // Buscar la habitación por ID
        Room room = roomRepository.findById(roomId).orElseThrow(() -> new RuntimeException("Room not found"));

        // Crear una nueva instancia de Image
        Image image = new Image();
        image.setFileName(file.getOriginalFilename());
        image.setFileType(file.getContentType());
        image.setData(file.getBytes()); // Convertir el archivo a bytes

        // Asociar la imagen a la habitación
        image.setRoom(room);

        // Guardar la imagen en la base de datos
        imageRepository.save(image);

        // Agregar la imagen a la lista de imágenes de la habitación
        room.getImages().add(image);

        // Guardar la habitación actualizada (aunque esto no es estrictamente necesario si la relación es bidireccional y está bien mapeada)
        return roomRepository.save(room);
    }

    public void deleteImagesByIds(List<Long> imageIdsToDelete) {
    }
}
