package com.app.services;

import java.util.List;

import com.app.payloads.DoctorDTO;
import com.app.payloads.UpdateDoctorDTO;
import com.app.pojos.Doctor;

public interface AdminService {

	Doctor addNewDoctor(DoctorDTO newDoctor);

	Doctor updateDoctor(Long pid, UpdateDoctorDTO newdoctor);

	String deleteDoctor(Long pid);

	List<DoctorDTO> showDoctors();

	

}
