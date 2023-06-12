package com.app.pojos;

import java.sql.Date;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.Length;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;
import org.springframework.security.core.userdetails.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name="user")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString(exclude={"appointments"})
public class Users {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "user_id")
	private Long id;
	
	@NotBlank(message = "First Name is required")
	@Length(min = 3,max=20,message = "Invalid length of firstName!")
	@Column(name = "first_name", length = 20)
	private String firstName;
	
	@Column(name = "last_name", length = 20)
	@NotBlank(message = "Last Name is required")
	private String last_name;
	
	@Column(length = 25, unique = true)
	@NotBlank(message = "Email required")
	@Email(message = "Invalid email format!")
	private String email;
	
	@Column(length = 150, nullable = false) 
	@JsonProperty(access = Access.WRITE_ONLY)//skips the field/property during serialization
	private String password;
	
	@Column(nullable = false)
	private Date date;
	
	@Column(length=15)
	private String contact_no;
	
	@Column(length=6)
	private String gender;
	
	@Enumerated(EnumType.STRING)
	@Column(name = "user_role", length = 30)
	@NotNull(message = "user role must be supplied!")
	private Role userRole;
	
	@Embedded
	@JsonProperty(value = "address")
	private Address address;
	
	@OneToMany(mappedBy = "user", fetch = FetchType.EAGER,
			cascade = CascadeType.ALL, orphanRemoval = true)
	@JsonIgnoreProperties(value = "user")
	private List<Appointment> appointments = new ArrayList<>();
	
	@OneToMany(mappedBy = "user",
			cascade = CascadeType.ALL, orphanRemoval = true)
	@JsonIgnoreProperties(value = "user")
	private List<Medication> medications = new ArrayList<>();
	
	public void setAddress(String city, String state, String pincode, String street) {
		this.address.setCity(city);
		this.address.setState(state);
		this.address.setPincode(pincode);
		this.address.setStreet(street);
		
	}
	
	public User toUser() {
		String role="ROLE_"+userRole.name();
		SimpleGrantedAuthority authority = new SimpleGrantedAuthority(role);
		User user = new User(email, password, 
				Collections.singletonList(authority));
		return user;

}
}