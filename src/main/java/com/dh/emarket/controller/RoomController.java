package com.dh.emarket.controller;

import com.dh.emarket.dto.ImageDTO;
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

    // Custom Exception
    @ResponseStatus(HttpStatus.NOT_FOUND)  // Retorna un 404 cuando no se encuentra la habitación
    public static class ResourceNotFoundException extends RuntimeException {
        public ResourceNotFoundException(String message) {
            super(message);
        }
    }
    // Endpoint para obtener una habitación por id
    @GetMapping("/{roomId}")
    public ResponseEntity<Room> getRoomById(@PathVariable Long roomId) {
        Room room = roomService.findById(roomId)
                .orElseThrow(() -> new ResourceNotFoundException("Room with id " + roomId + " not found"));

        return ResponseEntity.ok(room);  // Si la habitación se encuentra, retornamos 200 OK con la habitación
    }

    // endpoint para subir varias imagenes a una habitación
    @PostMapping("/{roomId}/images")
    public ResponseEntity<?> uploadImages(
            @PathVariable Long roomId,
            @RequestParam("files") MultipartFile[] files) {

        // Buscar la habitación por ID
        Room room = roomService.findById(roomId)
                .orElseThrow(() -> new ResourceNotFoundException("Room not found"));

        // Procesar los archivos
        for (MultipartFile file : files) {
            try {
                Image image = new Image();
                image.setFileName(file.getOriginalFilename());
                image.setFileType(file.getContentType());
                image.setData(file.getBytes());
                room.addImage(image);
                System.out.println("Imagen procesada: " + file.getOriginalFilename());
            } catch (IOException e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body("Error al subir el archivo: " + file.getOriginalFilename());
            }
        }

        // Guardar la habitación con las imágenes
        roomService.save(room);
        System.out.println(room);

        return ResponseEntity.ok("Imágenes subidas con éxito." );
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