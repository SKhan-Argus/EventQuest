package com.argusoft.eventquestbackend.repository;

import com.argusoft.eventquestbackend.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {
    Optional<Event> findByName(String name);
    List<Event> findByLocationIgnoreCase(String location);
    List<Event> findByNameContainingIgnoreCase(String name);
}
