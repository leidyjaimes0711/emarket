package com.dh.emarket.service;

import com.dh.emarket.model.Room;
import com.dh.emarket.repository.RoomRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RoomService {

    @Autowired
    private RoomRepository roomRepository;

    // Guardar o actualizar una habitación
    public Room save(Room room){
        Optional<Room> existingRoom = roomRepository.findByName(room.getName());
        if (existingRoom.isPresent()) {
            throw new IllegalArgumentException("El nombre de la habitación ya está en uso");
        }
        return roomRepository.save(room);  // Guardar o actualizar
    }

    // Eliminar una habitación por ID
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
            // Si tu entidad tiene más atributos, también debes actualizarlos aquí
            return roomRepository.save(room);
        }).orElseThrow(() -> new EntityNotFoundException("Room with id " + id + " not found"));
    }



    // Listar todas las habitaciones
    public List<Room> findAll(){
        return roomRepository.findAll();  // Obtener todas
    }

    // Encontrar habitación por ID
    public Optional<Room> findById(Long id) {
        return roomRepository.findById(id);  // Buscar por ID
    }
}
