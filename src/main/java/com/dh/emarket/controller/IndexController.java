package com.dh.emarket.controller;

import com.dh.emarket.model.Room;
import com.dh.emarket.service.RoomService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequestMapping("/index")
public class IndexController {

    private final RoomService roomService;

    public IndexController(RoomService roomService) {
        this.roomService = roomService;
    }

    @GetMapping
    public String findRoomById(Model model, @RequestParam("id") Long id){
        //buscamos la habitacion por ID
        Room room = roomService.findById(id);
        //agregamos la vista que corresponde con habitacion
        model.addAttribute("nameRoom", room.getName());
        model.addAttribute("descriptionRoom", room.getDescription());
        return  "index";

    }

}
