package com.dh.emarket.service;

import com.dh.emarket.model.Room;
import com.dh.emarket.repository.RoomRepository;
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
        return roomRepository.save(room);  // Guardar o actualizar
    }

    // Eliminar una habitación por ID
    public boolean delete(Long id){
        roomRepository.deleteById(id);  // Eliminar por ID
        return true;
    }

    // Método para actualizar una habitación
    public Room update(Long id, Room roomDetails) {
        Optional<Room> roomOptional = roomRepository.findById(id);
        if (roomOptional.isPresent()) {
            Room room = roomOptional.get();
            room.setName(roomDetails.getName());
            room.setDescription(roomDetails.getDescription());
            // Aquí puedes agregar más campos para actualizar si es necesario
            return roomRepository.save(room);
        } else {
            return null;  // Si la habitación no existe, retornamos null
        }
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
