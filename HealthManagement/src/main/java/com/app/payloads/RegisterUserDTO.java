package com.app.payloads;

import java.util.Date;

import com.app.pojos.Role;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class RegisterUserDTO {
	private String firstName;
	private String last_name;
	private String email;
	private String password;
	private Date date;
	private String contact_no;
	private String gender;
	private String userRole;
}
