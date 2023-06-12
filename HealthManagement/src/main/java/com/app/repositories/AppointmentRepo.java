package com.app.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.pojos.Appointment;

public interface AppointmentRepo extends JpaRepository<Appointment, Long> {

}
