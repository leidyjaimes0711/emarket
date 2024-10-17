package com.dh.emarket.repository;

import com.dh.emarket.model.Room;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface RoomRepository extends JpaRepository<Room, Long> {
    Optional<Room> findByName(String name);  // Método para buscar habitaciones por nombre

    List<Room> findTop10ByOrderByIdAsc(); // Cambia "Id" por cualquier otro campo por el que quieras ordenar.

}