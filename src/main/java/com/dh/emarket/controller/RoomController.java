package com.dh.emarket.controller;

import com.dh.emarket.model.Room;
import com.dh.emarket.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "http://localhost:3000")

@RestController
@RequestMapping("/rooms")
public class RoomController {

    @Autowired
    private RoomService roomService;

    public RoomController(RoomService roomService) {
        this.roomService = roomService;
    }

    //MÉTODOS____________________________________________

    //endpoint para agregar una habitación
    @PostMapping
    public ResponseEntity<Room> save(@RequestBody Room room) {
        try {
            Room savedRoom = roomService.save(room);  // Guardar la habitación usando el servicio
            return ResponseEntity.ok(savedRoom);  // Retornar la habitación guardada con estado 200 OK
        } catch (Exception e) {
            // Capturar cualquier error y retornar un estado 400 Bad Request
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
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
