package com.app.services;

import java.util.List;

import javax.validation.Valid;

import com.app.payloads.AddAddress;
import com.app.payloads.AddAppointmentDTO;
import com.app.payloads.AddMedicationDTO;
import com.app.payloads.BookAppointmentDTO;
import com.app.payloads.DoctorDTO;
import com.app.payloads.RegisterUserDTO;
import com.app.payloads.UpdateMedicationDTO;
import com.app.pojos.Appointment;
import com.app.pojos.Medication;
import com.app.pojos.Users;

public interface UserService {

	Users createUser(RegisterUserDTO user);

	void addAddress(Long uid, AddAddress dto);

	Appointment addAppointment(Long uid,Long pid,AddAppointmentDTO dto);

	List<BookAppointmentDTO> showAppointments(Long uid);

	String deleteAppointment(Long appointmentid);

	Medication addMedication(Long uid, AddMedicationDTO dto);

	Medication updateMedication(Long pid, UpdateMedicationDTO newMedication);

	String deleteMedicationid(Long medicationid);

	List<UpdateMedicationDTO> showMedications(Long uid);

	List<DoctorDTO> showDoctors();

}
