package com.argusoft.eventquestbackend.service;

import com.argusoft.eventquestbackend.model.Event;
import com.argusoft.eventquestbackend.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EventService {

    @Autowired
    private EventRepository eventRepository;

    public Event findByName(String name){
        return eventRepository.findByName(name).orElse(null);
    }

    public Event addEvent(Event event){
        return eventRepository.save(event);
    }

    public List<Event> findByLocation(String location){
        return eventRepository.findByLocationIgnoreCase(location);
    }

    public List<Event> findAllByName(String name){
        return eventRepository.findByNameContainingIgnoreCase(name);
    }

    public Event findEventById(Long id){
        return eventRepository.findById(id).orElse(null);
    }
}
