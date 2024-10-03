package com.emarket.emarket.service;

import com.emarket.emarket.dao.IDao;
import com.emarket.emarket.dao.RoomDao;
import com.emarket.emarket.model.Room;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoomService {

    private IDao<Room> roomDao;



    public RoomService() {
        this.roomDao = new RoomDao();  // Asegurarte de inicializar la instancia
    }
    public Room save(Room room) {
        return roomDao.save(room);
    }

    public Room findById(Integer id) {
        return roomDao.findById(id);
    }

    public void updateRoom(Room room) {
        roomDao.update(room);
    }

    public void deleteRoom(Integer id) {
        roomDao.delete(id);
    }

    public List<Room> findAll() {
        return roomDao.findAll();
    }


}
