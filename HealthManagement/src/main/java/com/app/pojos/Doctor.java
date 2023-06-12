package com.app.pojos;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.Length;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="doctor")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Doctor {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "doctor_id")
	private Long id;
	
	@NotBlank(message = "First Name is required")
	@Length(min = 4,max=20,message = "Invalid length of firstName!")
	@Column(name = "first_name", length = 20)
	private String firstName;
	
	@Column(name = "last_name", length = 20)
	@NotBlank(message = "Last Name is required")
	private String last_name;
	
	@Column(length = 25, unique = true)
	@NotBlank(message = "Email required")
	@Email(message = "Invalid email format!")
	private String email;
	
	@Column(name = "hospital_name", length = 20)
	@NotBlank(message = "hospital_name is required")
	private String hospital_name;
	
	@Column(name = "desease_name", length = 20)
	private String desease_name;
	
	@OneToMany(mappedBy = "doctor", fetch = FetchType.EAGER,
			cascade = CascadeType.ALL, orphanRemoval = true)
	@JsonIgnoreProperties(value = "doctor")
	private List<Appointment> doctorappointments = new ArrayList<>();
	
}
