package com.app.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.pojos.Users;

public interface UserRepo extends JpaRepository<Users, Long> {

	Users findByEmail(String email);

}
