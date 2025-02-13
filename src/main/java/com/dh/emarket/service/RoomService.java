package com.dh.emarket.service;

import com.dh.emarket.model.Category;
import com.dh.emarket.model.Room;
import com.dh.emarket.repository.CategoryRepository;
import com.dh.emarket.repository.RoomRepository;
import com.dh.emarket.repository.ImageRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class RoomService {

    @Autowired
    private RoomRepository roomRepository;
    @Autowired
    private ImageRepository imageRepository;
    private final CategoryRepository categoryRepository;


    // Constructor para inyección de dependencias
    @Autowired
    public RoomService(RoomRepository roomRepository, CategoryRepository categoryRepository) {
        this.roomRepository = roomRepository;
        this.categoryRepository = categoryRepository;
    }


    // Método Guardar o actualizar una habitación
    public Room save(Room room) {
        Optional<Room> existingRoom = roomRepository.findByName(room.getName());
        if (existingRoom.isPresent() && !existingRoom.get().getId().equals(room.getId())) {
            throw new IllegalArgumentException("El nombre de la habitación ya está en uso");
        }
        return roomRepository.save(room);
    }

    // Método Eliminar una habitación por ID
    public boolean delete(Long id){
        roomRepository.deleteById(id);  // Eliminar por ID
        return true;
    }

    // Método para actualizar una habitación
    public Room update(Long id, Room roomDetails) {
        return roomRepository.findById(id).map(room -> {
            // Actualizamos los datos de la habitación con los nuevos detalles
            room.setName(roomDetails.getName());
            room.setDescription(roomDetails.getDescription());
            room.setImages(roomDetails.getImages());
            return roomRepository.save(room);
        }).orElseThrow(() -> new EntityNotFoundException("Room with id " + id + " not found"));
    }



    // Método Listar todas las habitaciones
    public List<Room> findAll(){
        return roomRepository.findAll();  // Obtener todas
    }

    // Método Encontrar habitación por ID
    public Optional<Room> findById(Long id) {
        return roomRepository.findById(id);  // Buscar por ID
    }


    //método para eliminar una imagen existente de una habitación existente
    @Transactional
    public boolean deleteImageFromRoom(Long roomId, Long imageId) {
        Room room = roomRepository.findById(roomId).orElse(null);

        if (room != null) {
            room.getImages().removeIf(image -> image.getId().equals(imageId));
            roomRepository.save(room);
            return true;
        }

        return false;
    }

    // Método para guardar una habitación con categorías
    public Room saveRoomWithCategories(Room room, List<String> categoryNames) {
        // Obtener las categorías por sus nombres
        List<Category> categories = categoryNames.stream()
                .map(name -> categoryRepository.findByName(name)
                        .orElseThrow(() -> new RuntimeException("Category not found: " + name)))
                .collect(Collectors.toList());

        // Asignar las categorías a la habitación
        room.setCategories(categories);

        // Guardar la habitación en la base de datos
        return roomRepository.save(room);
    }


}