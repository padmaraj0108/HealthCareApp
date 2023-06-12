package com.app.pojos;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.Table;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
@Embeddable
@Table(name = "address")
@NoArgsConstructor

@ToString
@Getter
@Setter
public class Address {
	@Column(length = 20)
	private String city;
	@Column(length = 40)
	private String state;
	@Column(length = 6)
	private String pincode;
	@Column(length = 100)
	private String street;
	public Address(String city, String state, String pincode, String street) {
		super();
		this.city = city;
		this.state = state;
		this.pincode = pincode;
		this.street = street;
	}
}
