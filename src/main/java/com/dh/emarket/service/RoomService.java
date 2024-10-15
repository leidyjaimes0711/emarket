package com.dh.emarket.service;

import com.dh.emarket.dao.IDao;
import com.dh.emarket.dao.RoomDao;
import com.dh.emarket.model.Room;
import com.dh.emarket.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RoomService {

    //atributos
    private final IDao<Room> roomIDao;

    @Autowired
    private RoomRepository roomRepository;

    // Constructor para inicializar el DAO
    @Autowired
    public RoomService (IDao<Room> roomIDao){
        this.roomIDao = roomIDao;
    }

    // Métodos usando el DAO

    // Guardar una habitación
    public Room save(Room room){
        return roomRepository.save(room);  // Usamos el DAO para guardar
    }

    // Actualizar una habitación
    public void update(Room room){
        roomIDao.update(room);  // Usamos el DAO para actualizar
    }

    // Eliminar una habitación
    public void delete(Long id){
        roomIDao.delete(id);  // Usamos el DAO para eliminar
    }

    // Listar todas las habitaciones
    public List<Room> findAll(){
        return roomIDao.findAll();  // Usamos el DAO para obtener todas
    }

    // Encontrar habitación por ID
    public Optional<Room> findById(Long id) {
        return Optional.ofNullable(roomIDao.findById(id));  // Usamos el DAO para buscar por ID
    }
}