package com.argusoft.eventquestbackend.repository;

import com.argusoft.eventquestbackend.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookingRepository extends JpaRepository<Booking, Long> {
}
