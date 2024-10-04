package com.dh.emarket.model;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Room {
    @Id
    private Long id;

    private String name;

    // Getters and setters
}

