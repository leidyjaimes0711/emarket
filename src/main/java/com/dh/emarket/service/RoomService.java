package com.dh.emarket.service;

import com.dh.emarket.dao.IDao;
import com.dh.emarket.dao.RoomDao;
import com.dh.emarket.model.Room;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoomService {

    private final IDao<Room> roomIDao;

    public RoomService (){
        this.roomIDao = new RoomDao();
    }

    public Room save(Room room){
        return roomIDao.save(room);
    }

    public Room findById(Long id){
        return roomIDao.findById(id);
    }
    public void update(Room room){
        roomIDao.update(room);
    }
    public void delete(Long id){
        roomIDao.delete(id);
    }

    public List<Room> findAll(){
        return roomIDao.findAll();
    }



}
