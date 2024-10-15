package com.dh.emarket.controller;

import com.dh.emarket.dto.ImageDTO;
import com.dh.emarket.exceptions.ResourceNotFoundException;
import com.dh.emarket.model.Image;
import com.dh.emarket.model.Room;
import com.dh.emarket.repository.RoomRepository;
import com.dh.emarket.service.ImageService;
import com.dh.emarket.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
@CrossOrigin(origins = "http://localhost:3000")

@RestController
@RequestMapping("/api/rooms")
public class RoomController {

    //atributos____________________________________________
    @Autowired
    private RoomRepository roomRepository;  // Inyectamos el repositorio

    @Autowired
    private ImageService imageService;

    @Autowired
    private RoomService roomService;


    //constructor____________________________________________
    public RoomController(RoomService roomService) {
        this.roomService = roomService;
    }


    //MÉTODOS____________________________________________

    // endpoint para mostrar todas las habitaciones
    @GetMapping
    public ResponseEntity<List<Room>> getAllRooms() {
        List<Room> rooms = roomRepository.findAll();
        return ResponseEntity.ok(rooms);
    }

    // endpoint para mostrar 1 habitacion por id
    @GetMapping("/{roomId}")
    public ResponseEntity<Room> getRoomById(@PathVariable Long roomId) {
        Room room = roomService.findById(roomId).orElseThrow(() -> new RuntimeException("Room not found"));
        return ResponseEntity.ok(room);
    }

    // endpoint para subir varias imagenes a una habitación
    // endpoint para subir varias imagenes a una habitación
    @PostMapping("/{roomId}/images")
    public ResponseEntity<?> uploadImages(
            @PathVariable Long roomId,
            @RequestParam("files") MultipartFile[] files) {

        Room room = roomService.findById(roomId)
                .orElseThrow(() -> new ResourceNotFoundException("Room not found"));

        for (MultipartFile file : files) {
            try {
                Image image = new Image();
                image.setFileName(file.getOriginalFilename());
                image.setFileType(file.getContentType());
                image.setData(file.getBytes());
                room.addImage(image);
            } catch (IOException e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body("Error uploading file: " + file.getOriginalFilename());
            }
        }

        roomService.save(room);
        return ResponseEntity.ok("Images uploaded successfully");
    }


    //endpoint para ver las imagenes de una habitacion por ID
    @GetMapping("/{roomId}/images")
    public List<ImageDTO> getImagesByRoom(@PathVariable Long roomId) {
        return imageService.getImagesByRoom(roomId);
    }

    // endpoint para agregar una nueva habitación
    @PostMapping
    public ResponseEntity<Room> createRoom(@RequestBody Room room) {
        Room newRoom = roomRepository.save(room);
        return ResponseEntity.status(HttpStatus.CREATED).body(newRoom);
    }

}