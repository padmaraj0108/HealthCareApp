package com.app.services;

import java.sql.Date;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.Exceptions.ResourceNotFoundException;
import com.app.payloads.AddAddress;
import com.app.payloads.AddAppointmentDTO;
import com.app.payloads.AddMedicationDTO;
import com.app.payloads.BookAppointmentDTO;
import com.app.payloads.DoctorDTO;
import com.app.payloads.RegisterUserDTO;
import com.app.payloads.UpdateMedicationDTO;
import com.app.pojos.Address;
import com.app.pojos.Appointment;
import com.app.pojos.Doctor;
import com.app.pojos.Medication;
import com.app.pojos.Users;
import com.app.repositories.AppointmentRepo;
import com.app.repositories.DoctorRepo;
import com.app.repositories.MedicationRepo;
import com.app.repositories.UserRepo;

@Service
@Transactional
public class UserServiceImpl implements UserService {
	@Autowired
	private UserRepo userRepo;
	
	@Autowired
	private ModelMapper modelMapper;
	
	@Autowired
	private DoctorRepo DoctorRepo;
	
	@Autowired
	private AppointmentRepo appointmentRepo;

	@Autowired
	private  MedicationRepo medicationRepo;
//////////////////////////////////////////////////////////////
	//Register Users
	@Override
	public Users createUser(RegisterUserDTO userdto) {
		Users user=this.dtoToUser(userdto);
		return userRepo.save(user);
	}

	private Users dtoToUser(RegisterUserDTO userdto) {
		Users newUser=this.modelMapper.map(userdto, Users.class);
		return newUser;
	}
	
	public RegisterUserDTO userTodto(Users createdUser)
	{
		RegisterUserDTO newUser=this.modelMapper.map(createdUser, RegisterUserDTO.class);
		return newUser;
	}

//////////////////////////////////////////////////////////////////
	//Method to update the user Address
	
	@Override
	public void addAddress(Long uid, AddAddress dto) {
		// TODO Auto-generated method stub
		Users existinguser=this.userRepo.findById(uid).orElseThrow(()->new ResourceNotFoundException("Patient Not found"));
		Address address=new Address(dto.getCity(),dto.getState(),dto.getPincode(),dto.getStreet());
		existinguser.setAddress(address);
		
	}
///////////////////////////////////////////////////////////////////
//method to Book Appointment
	@Override
	public Appointment addAppointment(Long uid,Long pid,AddAppointmentDTO dto) {
		Users existinguser=this.userRepo.findById(uid).orElseThrow(()->new ResourceNotFoundException("Patient Not found"));
		Doctor existingdoctor=DoctorRepo.findById(pid).orElseThrow(()->new ResourceNotFoundException("Doctor does not Exist"));
		Appointment newappointment=new Appointment();
		newappointment.setDateTime(dto.getDateTime());
		newappointment.setDoctor(existingdoctor);
		newappointment.setUser(existinguser);
		newappointment.setUser(existinguser);
		newappointment.setDescription(dto.getDescription());
		existinguser.getAppointments().add(newappointment);
		return newappointment;
		
	}
////////////////////////////////////////////////////////////////////////
//show all appointments of user
	@Override
	public List<BookAppointmentDTO> showAppointments(Long uid) {
		Users existinguser=this.userRepo.findById(uid).orElseThrow(()->new ResourceNotFoundException("Patient Not found"));
		List<Appointment>appointments=appointmentRepo.findAll();
		List<Appointment>appointmentsList=appointments.stream().filter(appointment->appointment.getUser().getId()==uid).collect(Collectors.toList());
		List<BookAppointmentDTO>list=appointmentsList.stream().map(appointment->new BookAppointmentDTO(appointment.getId(),appointment.getDateTime(),appointment.getDoctor().getId(),appointment.getUser().getId(),appointment.getDescription())).collect(Collectors.toList());;
		return list;
	}
/////////////////////////////////////////////////////////////////////////////
//cancel the appointment
	@Override
	public String deleteAppointment(Long appointmentid) {
		Appointment appointmentTobeDeleted=appointmentRepo.findById(appointmentid).orElseThrow(()->new ResourceNotFoundException("Appointment does not Exist"));
		if(appointmentTobeDeleted!=null)
		{
			appointmentTobeDeleted.getUser().getAppointments().remove(appointmentTobeDeleted);
			appointmentTobeDeleted.getDoctor().getDoctorappointments().remove(appointmentTobeDeleted);
			appointmentRepo.delete(appointmentTobeDeleted);
			
			return "Appointment deleted successfully...!";
				
		}
		return "Appointment not found...!";
	
	}
////////////////////////////////////////////////////////////////	
//Add Medication 
	@Override
	public Medication addMedication(Long uid, AddMedicationDTO dto) {
		Users existinguser=this.userRepo.findById(uid).orElseThrow(()->new ResourceNotFoundException("Patient Not found"));
		Medication medication=new Medication();
		medication.setName(dto.getName());
		medication.setFrequency(dto.getFrequency());
		medication.setDosage(dto.getDosage());
		medication.setUser(existinguser);
		existinguser.getMedications().add(medication);
		return medication;
	}
//////////////////////////////////////////////////////////////	
//update Medication
	
	@Override
	public Medication updateMedication(Long pid, UpdateMedicationDTO newMedication) {
		Medication MedicationToBeUpdated= medicationRepo.findById(pid).orElseThrow(()->new ResourceNotFoundException("Medication Not found"));
		MedicationToBeUpdated.setDosage(newMedication.getDosage());
		MedicationToBeUpdated.setFrequency(newMedication.getFrequency());
		MedicationToBeUpdated.setName(newMedication.getName());
		return medicationRepo.save(MedicationToBeUpdated);
		
	}

//////////////////////////////////////////////////////////////////////////////////
	//Delete Medication
	@Override
	public String deleteMedicationid(Long medicationid) {
		Medication medicationTobeDeleted=medicationRepo.findById(medicationid).orElseThrow(()->new ResourceNotFoundException("medicationid does not Exist"));
		if(medicationTobeDeleted!=null)
		{
		
			medicationRepo.delete(medicationTobeDeleted);
			
			return "Medication deleted successfully...!";
				
		}
		return "Medication not found...!";

	}
//////////////////////////////////////////////////////////////////////////////	
//show Medication of user
	@Override
	public List<UpdateMedicationDTO> showMedications(Long uid) {
		Users existinguser=this.userRepo.findById(uid).orElseThrow(()->new ResourceNotFoundException("Patient Not found"));
		List<Medication>medications=medicationRepo.findAll();
		List<Medication>medicationList=medications.stream().filter(medication->medication.getUser().getId()==uid).collect(Collectors.toList());
		List<UpdateMedicationDTO>list=medicationList.stream().map(medication->new UpdateMedicationDTO(medication.getId(),medication.getName(),medication.getDosage(),medication.getFrequency())).collect(Collectors.toList());;
		return list;
	}

	
	
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//show All Doctors to user
	@Override
	public List<DoctorDTO> showDoctors() {
		List<Doctor>doctorslist=DoctorRepo.findAll();
		List<DoctorDTO> list=doctorslist.stream().map(doctor->new DoctorDTO(doctor.getId(),doctor.getFirstName(),doctor.getLast_name(),doctor.getEmail(),doctor.getHospital_name(),doctor.getDesease_name())).collect(Collectors.toList());
		return list;
	}
}
