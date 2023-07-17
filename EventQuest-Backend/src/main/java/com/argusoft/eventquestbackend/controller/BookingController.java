package com.argusoft.eventquestbackend.controller;

import com.argusoft.eventquestbackend.model.Booking;
import com.argusoft.eventquestbackend.model.BookingResponse;
import com.argusoft.eventquestbackend.model.Event;
import com.argusoft.eventquestbackend.service.BookingService;
import com.argusoft.eventquestbackend.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@CrossOrigin
@RestController
@RequestMapping("/bookings")
public class BookingController {

    @Autowired
    private BookingService bookingService;
    @Autowired
    private EventService eventService;
    @PostMapping("/add")
    public ResponseEntity<BookingResponse> addBooking(@RequestBody Booking booking) {
        System.out.println(booking);

        Long eventId = booking.getEventId();
        Event event = eventService.findEventById(eventId);
        event.setAvailability(event.getAvailability()-booking.getTicketQuantity());
        booking.setStatus("Confirmed");
        Booking createdBooking = bookingService.addBooking(booking);
        BookingResponse bookingResponse  = new BookingResponse();
        bookingResponse.setSuccess(true);
        bookingResponse.setMessage("Booking Successful");
        bookingResponse.setId(booking.getId());
        return ResponseEntity.status(HttpStatus.CREATED).body(bookingResponse);
    }

    @GetMapping("/{bookingId}")
    public ResponseEntity<Booking> findBookingById(@PathVariable Long bookingId){
        Booking booking = bookingService.findBookingById(bookingId);
        if(booking == null){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.ok(booking);

    }

    @PostMapping("/payment")
    public  ResponseEntity<String> bookingPayment(@RequestParam("bookingId") Long bookingId){
        Booking booking = bookingService.findBookingById(bookingId);

        return null;
    }

}
