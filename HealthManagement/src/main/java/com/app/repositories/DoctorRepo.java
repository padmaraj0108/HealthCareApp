package com.app.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.pojos.Doctor;

public interface DoctorRepo extends JpaRepository<Doctor, Long> {

}
