package com.app.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.payloads.AddAddress;
import com.app.payloads.AddAppointmentDTO;
import com.app.payloads.AddMedicationDTO;
import com.app.payloads.ApiResponse;
import com.app.payloads.BookAppointmentDTO;
import com.app.payloads.DoctorDTO;
import com.app.payloads.RegisterUserDTO;
import com.app.payloads.UpdateMedicationDTO;
import com.app.pojos.Appointment;
import com.app.pojos.Medication;

import com.app.pojos.Users;

import com.app.services.UserService;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins ="http://localhost:3000")
public class UserController {
	
	public UserController() {
		System.out.println("int the ctor of "+getClass().getName());
	}
	
	@Autowired
	private UserService userService;
	
/////////////////////////////////////////////////////////////////////////////

	
///////////////////////////////////////////////////////////////////////////////////
	//update the user address
	@PostMapping("/addAddress/{uid}")
	public ResponseEntity<?> addAddress(@PathVariable Long uid,@RequestBody AddAddress dto)
	{
		System.out.println("inside user controller & profile complete method:"+uid);
		userService.addAddress(uid, dto);
		return new ResponseEntity(new ApiResponse("Address added...! ",true),HttpStatus.CREATED);
}
/////////////////////////////////////////////////////////////////////////////////
	
	//Patient can Book Appointment
	@PostMapping("/bookappointment/{uid}/{pid}")
	public ResponseEntity<?> addAppointment(@PathVariable Long uid, @PathVariable Long pid,@RequestBody AddAppointmentDTO dto)
	{
		System.out.println("inside user controller & profile complete method:");
		Appointment createdAppointment=userService.addAppointment(uid,pid,dto);
		String msg="";
		if(createdAppointment!=null) {
			msg="Appointment Booked Successfully";
		}
		else {
			msg= "Appointment not booked";
		}
		return new ResponseEntity(new ApiResponse(msg,true),HttpStatus.CREATED);
}
	
/////////////////////////////////////////////////////////////////////////////////

	//showAllAppointmentsofuser
	@GetMapping("/showappointments/{uid}")
	public ResponseEntity<List<BookAppointmentDTO>> showAppointments(@PathVariable Long uid)
	{
		List<BookAppointmentDTO> allAppointments=userService.showAppointments(uid);
		allAppointments.forEach(l->System.out.println(l));
		return new ResponseEntity<>(allAppointments, HttpStatus.OK);
		
	}
/////////////////////////////////////////////////////////////////////////////////////////
	
	//cancel the appointment
	@DeleteMapping("/delete/{appointmentid}")
	public ResponseEntity<String> deleteDoctor(@PathVariable Long appointmentid)
	{
			System.out.println("inside admin controller and delete Appointment method");		
					
				return new ResponseEntity(new ApiResponse(this.userService.deleteAppointment(appointmentid),true),HttpStatus.OK);
						
	}
	
////////////////////////////////////////////////////////////////////////////////////////////
	//add medication to desease
	
	@PostMapping("/addmedication/{uid}")
	public ResponseEntity<?> addmedication(@PathVariable Long uid,@RequestBody AddMedicationDTO dto)
	{
		System.out.println("inside user controller & addmedication");
		Medication createdmedication=userService.addMedication(uid,dto);
		String msg="";
		if(createdmedication!=null) {
			msg="medication Added Successfully";
		}
		else {
			msg= "medication not added";
		}
		return new ResponseEntity(new ApiResponse(msg,true),HttpStatus.CREATED);
}
	
/////////////////////////////////////////////////////////////////
//update medication
	
	@PutMapping("updatemedication/{pid}")
	public ResponseEntity<?> updateMedication(@RequestBody UpdateMedicationDTO newMedication, @PathVariable Long pid)
	{
		System.out.println("in update Medication method");
		Medication detachedMedication= userService.updateMedication(pid,newMedication); 

		if(detachedMedication!=null)
		return new ResponseEntity(new ApiResponse("Medication updated successfully",true), HttpStatus.OK);
		else
		return new ResponseEntity<String>("Medication updated unsuccessfull", HttpStatus.NOT_ACCEPTABLE);
		
	}
	
/////////////////////////////////////////////////////////////////////////////////
//delete Medication
	
		@DeleteMapping("/deletemedication/{medicationid}")
		public ResponseEntity<String> deleteMedication(@PathVariable Long medicationid)
		{
				System.out.println("inside user controller and delete Medication method");		
						
					return new ResponseEntity(new ApiResponse(this.userService.deleteMedicationid(medicationid),true),HttpStatus.OK);
					
}
////////////////////////////////////////////////////////////////////////////
		//showAllMedicationofuser
		@GetMapping("/showmedications/{uid}")
		public ResponseEntity<List<UpdateMedicationDTO>> showMedications(@PathVariable Long uid)
		{
			List<UpdateMedicationDTO> allMedications=userService.showMedications(uid);
			allMedications.forEach(l->System.out.println(l));
			return new ResponseEntity<>(allMedications, HttpStatus.OK);
			
		}
//////////////////////////////////////////////////////////////////////////
		//see the list of doctor
		@GetMapping("/showalldoctors")
		public ResponseEntity<List<DoctorDTO>> showDoctors()
		{
			List<DoctorDTO> allDoctors=userService.showDoctors();
			allDoctors.forEach(l->System.out.println(l));
			return new ResponseEntity<>(allDoctors, HttpStatus.OK);
			
		}
}