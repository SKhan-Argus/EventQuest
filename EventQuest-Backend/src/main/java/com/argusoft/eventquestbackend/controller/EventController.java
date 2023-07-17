package com.argusoft.eventquestbackend.controller;

import com.argusoft.eventquestbackend.model.Event;
import com.argusoft.eventquestbackend.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/events")
public class EventController {

    @Autowired
    private EventService eventService;

    @PostMapping("/add")
    public ResponseEntity<String> addEvent(@RequestBody Event event) {

        if(eventService.findByName(event.getName()) != null){
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Event name already exists");
        }
        eventService.addEvent(event);
        return ResponseEntity.ok("Event added.");
    }

    @GetMapping("/location")
    public List<Event> findByLocation(@RequestParam("location") String location){
        return eventService.findByLocation(location);
    }

    @GetMapping("/name")
    public List<Event> findAllByName(@RequestParam("name") String name){
        return eventService.findAllByName(name);
    }

}
