package com.dh.emarket.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Setter
@Getter
@Entity
public class Category {

    @Getter
    @Setter
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Setter
    @Getter
    @Column(nullable = false, unique = true)
    private String name;

    @ManyToMany(mappedBy = "categories", fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Room> rooms;


    //constructor
    public Category(Long id, String name) {
        this.id = id;
        this.name = name;
    }

    public Category() {
    }


    //getters y setters

}
