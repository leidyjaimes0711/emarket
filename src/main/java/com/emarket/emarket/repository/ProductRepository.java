package com.emarket.emarket.repository;

import com.emarket.emarket.model.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Room, Integer> {

    boolean existsByName(String name);
}