package com.dh.emarket.service;

import com.dh.emarket.dto.ImageDTO;
import com.dh.emarket.model.Image;
import com.dh.emarket.repository.ImageRepository;
import com.dh.emarket.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

}
