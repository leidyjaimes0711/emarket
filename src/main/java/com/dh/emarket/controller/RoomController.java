package com.dh.emarket.controller;

import com.dh.emarket.dto.ImageDTO;
import com.dh.emarket.model.Category;
import com.dh.emarket.model.Image;
import com.dh.emarket.model.Room;
import com.dh.emarket.repository.CategoryRepository;
import com.dh.emarket.repository.RoomRepository;
import com.dh.emarket.service.ImageService;
import com.dh.emarket.service.RoomService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;

import java.io.IOException;
import java.util.ArrayList;
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
    @Autowired
    private CategoryRepository categoryRepository;


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
    // endpoint para mostrar el total de habitaciones ____________________________________
    @GetMapping("/total")
    public ResponseEntity<Long> getTotalRooms() {
        long totalRooms = roomRepository.count();
        return ResponseEntity.ok(totalRooms);
    }

    // endpoint para mostrar 1 habitacion por id ____________________________________

    // Custom Exception
    @ResponseStatus(HttpStatus.NOT_FOUND)  // Retorna un 404 cuando no se encuentra la habitación
    public static class ResourceNotFoundException extends RuntimeException {
        public ResourceNotFoundException(String message) {
            super(message);
        }
    }

    @GetMapping("/{roomId}")
    public ResponseEntity<Room> getRoomById(@PathVariable Long roomId) {
        Room room = roomService.findById(roomId)
                .orElseThrow(() -> new ResourceNotFoundException("Room with id " + roomId + " not found"));

        return ResponseEntity.ok(room);  // Si la habitación se encuentra, retornamos 200 OK con la habitación
    }

    // endpoint para subir varias imagenes a una habitación________________
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

        return ResponseEntity.ok("Imágenes subidas con éxito.");
    }


    //endpoint para ver las imagenes de una habitacion por ID
    @GetMapping("/{roomId}/images")
    public List<ImageDTO> getImagesByRoom(@PathVariable Long roomId) {
        return imageService.getImagesByRoom(roomId);
    }

    // Endpoint para crear una habitación
    @PostMapping
    public ResponseEntity<?> createRoom(@RequestParam("name") String name,
                                        @RequestParam("description") String description,
                                        @RequestParam("images") List<MultipartFile> images,
                                        @RequestParam("categories") List<String> categoryNames)

    {
        // Verificar si el nombre ya existe en la base de datos
        Optional<Room> existingRoom = roomRepository.findByName(name);
        if (existingRoom.isPresent()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("El nombre de la habitación ya está en uso");
        }

        // Crear una nueva instancia de Room y establecer sus atributos
        Room room = new Room();
        room.setName(name);
        room.setDescription(String.valueOf(description));

        // Procesar y guardar las imágenes
        List<Image> imageList = new ArrayList<>();
        for (MultipartFile file : images) {
            try {
                Image image = new Image();
                image.setFileName(file.getOriginalFilename());
                image.setFileType(file.getContentType());
                image.setData(file.getBytes());  // Guardar los bytes de la imagen

                image.setRoom(room);  // Relacionar la imagen con la habitación
                imageList.add(image);
            } catch (IOException e) {
                // Manejo del error al procesar la imagen
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al procesar las imágenes");
            }
        }

        // Establecer las imágenes en la habitación
        room.setImages(imageList);

        // Asociar categorías a la habitación
        List<Category> categories = new ArrayList<>();
        for (String categoryName : categoryNames) {
            if (categoryName != null && !categoryName.trim().isEmpty()) { // Validar el nombre
                categoryName = categoryName.trim(); // Eliminar espacios en blanco
                Optional<Category> category = categoryRepository.findByName(categoryName);

                if (category.isPresent()) {
                    categories.add(category.get());
                } else {
                    // Crear nueva categoría si no existe
                    Category newCategory = new Category();
                    newCategory.setName(categoryName);
                    try {
                        Category savedCategory = categoryRepository.save(newCategory); // Guardar en la BD
                        categories.add(savedCategory); // Agregar la categoría guardada a la lista
                    } catch (Exception e) {
                        // Manejo de errores si ocurre un problema al guardar la categoría
                        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                .body("Error al crear la categoría: " + categoryName);
                    }
                }
            }
        }
        room.setCategories(categories);

        // Guardar la habitación en la base de datos
        try {
            Room savedRoom = roomRepository.save(room);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedRoom);
        } catch (Exception e) {
            // Manejo del error al guardar la habitación
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al guardar la habitación");
        }
    }


    // Endpoint para eliminar una habitación por ID ____________________________________________
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRoom(@PathVariable Long id) {
        boolean isDeleted = roomService.delete(id);
        if (isDeleted) {
            return ResponseEntity.ok().build();  // 200 OK si se eliminó correctamente
        } else {
            return ResponseEntity.notFound().build();  // 404 Not Found si la habitación no existe
        }
    }


    // Endpoint para actualizar una habitación por ID___________________________________
    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> updateRoom(
            @PathVariable Long id,
            @RequestPart("room") String roomJson,  // El JSON de la habitación en forma de String
            @RequestPart(value = "images", required = false) MultipartFile[] images,  // Las nuevas imágenes (opcional)
            @RequestPart(value = "imageIdsToDelete", required = false) List<Long> imageIdsToDelete  // IDs de las imágenes a eliminar (opcional)
    ) {
        ObjectMapper objectMapper = new ObjectMapper();
        Room room;

        try {
            // Convertimos el JSON recibido de la habitación a un objeto
            room = objectMapper.readValue(roomJson, Room.class);
        } catch (JsonProcessingException e) {
            return ResponseEntity.badRequest().body("Error al procesar JSON de la habitación");
        }

        // Intentamos actualizar la habitación
        try {
            Room existingRoom = roomService.findById(id)
                    .orElseThrow(() -> new EntityNotFoundException("Habitación no encontrada"));

            // Actualizamos los datos básicos de la habitación con los datos del JSON
            existingRoom.setName(room.getName());
            existingRoom.setDescription(room.getDescription());


            // Si se reciben nuevas imágenes, las procesamos
            if (images != null && images.length > 0) {
                processImages(images, existingRoom);  // Extraemos la lógica de imágenes a un método separado
            }

            Room updatedRoom = roomService.save(existingRoom);  // Guardamos los cambios en la habitación

            return ResponseEntity.ok(updatedRoom);  // Devolvemos la habitación actualizada
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al procesar las imágenes");
        }
    }

    // Método para procesar y agregar imágenes a la habitación
    private void processImages(MultipartFile[] images, Room room) throws IOException {
        for (MultipartFile image : images) {
            Image newImage = new Image();
            newImage.setFileName(image.getOriginalFilename());
            newImage.setFileType(image.getContentType());
            newImage.setData(image.getBytes());
            room.addImage(newImage);  // Agregamos la nueva imagen
        }
    }


    // Endpoint para eliminar una imagen de una habitacion ____________________________________________
    @DeleteMapping("/{roomId}/images/{imageId}")
    public ResponseEntity<String> deleteImageFromRoom(@PathVariable Long roomId, @PathVariable Long imageId) {
        boolean deleted = roomService.deleteImageFromRoom(roomId, imageId);
        if (deleted) {
            return ResponseEntity.ok("Image deleted successfully.");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}