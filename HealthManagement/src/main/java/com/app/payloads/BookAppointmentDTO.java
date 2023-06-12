package com.app.payloads;

import java.time.LocalDateTime;

import com.app.pojos.Doctor;
import com.app.pojos.Users;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BookAppointmentDTO {
	private Long id;
	private LocalDateTime dateTime;
	private Long doctorid;;
	private Long userid;
	private String description;
}
