package com.argusoft.eventquestbackend.service;

import com.argusoft.eventquestbackend.model.Booking;
import com.argusoft.eventquestbackend.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    public Booking addBooking(Booking booking){
        return bookingRepository.save(booking);
    }

    public Booking findBookingById(Long id){
        return bookingRepository.findById(id).orElse(null);
    }
}
