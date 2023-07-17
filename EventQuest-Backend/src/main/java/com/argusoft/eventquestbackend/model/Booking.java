package com.argusoft.eventquestbackend.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "bookings")
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;

    private Long eventId;

    private String bookingDate;

    private int ticketQuantity;

    private double totalPrice;

    private String status;
}
