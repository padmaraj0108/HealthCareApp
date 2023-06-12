package com.app.payloads;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AddMedicationDTO {
	private Long id;
	 private String name;
	 private String dosage;
	 private String frequency;
}
