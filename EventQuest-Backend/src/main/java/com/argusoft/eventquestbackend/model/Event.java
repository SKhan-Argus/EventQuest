package com.argusoft.eventquestbackend.model;


import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "events")
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String date;

    private String time;

    private String location;

    private String description;

    private int availability;

    private double price;
}
