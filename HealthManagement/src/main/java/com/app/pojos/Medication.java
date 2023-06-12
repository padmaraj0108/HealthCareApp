package com.app.pojos;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Medication {
	    @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    @Column(name = "medication_id")
	    private Long id;

	    @Column(name = "name", length = 20,nullable=false)
	    private String name;

	    @Column(name = "dosage", length = 20,nullable=false)
	    private String dosage;

	    @Column(name = "frequency", length = 20,nullable=false)
	    private String frequency;
	    
	     @ManyToOne
		 @JoinColumn(name = "user_id", nullable = false)
		 private Users user;
}
