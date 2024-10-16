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
    public void delete(Long id){
        roomRepository.deleteById(id);  // Eliminar por ID
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
