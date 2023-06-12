package com.app.payloads;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class DoctorDTO {
	private Long id;
	private String firstName;
	private String last_name;
	private String email;
	private String hospital_name;
	private String desease_name;
	
}
