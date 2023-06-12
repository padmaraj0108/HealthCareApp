package com.app.payloads;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
@AllArgsConstructor
public class AuthDto {

private Long id;
	
	private String firstName;
	

	private String last_name;
	
	private String email;

	private String password;
	
	
	private Date date;
	
	private String contact_no;
	

	private String gender;
	
	
	private String token;
	
	private String city;

	private String state;

	private String pincode;

	private String street;
	
	private String role;

	public AuthDto(Long id, String firstName, String last_name, String email, String password, Date date,
			String contact_no, String gender, String token,String role) {
		super();
		this.id = id;
		this.firstName = firstName;
		this.last_name = last_name;
		this.email = email;
		this.password = password;
		this.date = date;
		this.contact_no = contact_no;
		this.gender = gender;
		this.token = token;
		this.role = role;
	}
	
}
