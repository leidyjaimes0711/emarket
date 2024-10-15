package com.dh.emarket.repository;

import com.dh.emarket.model.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ImageRepository extends JpaRepository<Image, Long> {

    // Método para obtener las imágenes por habitación
    List<Image> findByRoomId(Long roomId);

}