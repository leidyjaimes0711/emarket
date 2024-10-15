package com.dh.emarket.repository;

import com.dh.emarket.model.Room;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoomRepository extends JpaRepository<Room, Long> {
    // Aquí puedes agregar métodos personalizados si los necesitas
}
