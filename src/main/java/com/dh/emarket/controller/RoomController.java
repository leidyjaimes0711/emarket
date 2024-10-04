package com.dh.emarket.controller;

import com.dh.emarket.model.Room;
import com.dh.emarket.service.RoomService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/rooms")
public class RoomController {

    private RoomService roomService;

    public RoomController(RoomService roomService) {
        this.roomService = roomService;
    }

    //MÉTODOS____________________________________________

    //endpoint para agregar una habitación
    @PostMapping
    public Room save(@RequestBody Room room){
        return roomService.save(room);
    }

    //endpoint para actualizar una habitación
    @PutMapping
    public void update(@RequestBody Room room){
        roomService.update(room);
    }

    //endpoint para buscar habitación por ID
    @GetMapping ("/{id}")
    public Room findById(@PathVariable ("id") Long id){
        return roomService.findById(id);
    }

    //endpoint para mostrar todas las habitaciones
    @GetMapping
    public List<Room> findAll(){
       return roomService.findAll();
    }

    //endpoint para borrar una habitación por id
    @DeleteMapping ("{id}")
    public void delete (@PathVariable Long id){
        roomService.delete(id);
    }



}
