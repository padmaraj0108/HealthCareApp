package com.app.pojos;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "appointment")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Appointment {
	 public Appointment(long l, LocalDateTime now) {
		this.id=0L;
		this.dateTime=now;
	}

	@Id
	 @GeneratedValue(strategy = GenerationType.IDENTITY)
	 private Long id;
	 
	 @Column(nullable = false)
	 private LocalDateTime dateTime;
	 
	 @Column(nullable = false)
	 private String description;
	 
	 //unidirectional relationship between doctor and appointment
	 @ManyToOne
	 @JoinColumn(name = "doctor_id", nullable = false)
	 private Doctor doctor;
	 
	 //bidirectional relation between Appointment and Users
	 @ManyToOne
	 @JoinColumn(name = "user_id", nullable = false)
	 private Users user;
}
