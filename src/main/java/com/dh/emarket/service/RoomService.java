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

    //constructor
    public RoomService (){
        this.roomIDao = new RoomDao();
    }

    //métodos

    public Room save(Room room){
        return roomIDao.save(room);
    }

    public void update(Room room){
        roomIDao.update(room);
    }
    public void delete(Long id){
        roomIDao.delete(id);
    }

    public List<Room> findAll(){
        return roomRepository.findAll();
    }

    public Optional<Room> findById(Long id) {
        return roomRepository.findById(id);
    }





}