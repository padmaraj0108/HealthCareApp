package com.app.controller;

import java.util.List;

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

import com.app.payloads.ApiResponse;
import com.app.payloads.DoctorDTO;
import com.app.payloads.UpdateDoctorDTO;
import com.app.payloads.UpdateMedicationDTO;
import com.app.pojos.Doctor;
import com.app.services.AdminService;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins ="http://localhost:3000")
public class AdminController {
	@Autowired
	private AdminService adminService;
	
	public AdminController() {
		System.out.println("int the ctor of "+getClass().getName());
	}
/////////////////////////////////////////////////////////////////
	//add new doctor
	@PostMapping("/adddoctor")
	public ResponseEntity<?> AddDoctor(@RequestBody DoctorDTO newDoctor)
	{
		System.out.println("in add doctor method");
		
		
		Doctor detachedDoctor=adminService.addNewDoctor(newDoctor);
		
		if(detachedDoctor!=null)
		return new ResponseEntity(new ApiResponse("New Doctor has been Added..!",true), HttpStatus.ACCEPTED);
		else
		return new ResponseEntity(new ApiResponse("Error while adding Doctor..!",false), HttpStatus.NOT_ACCEPTABLE);
		
	}
////////////////////////////////////////////////////////////////////
	
	//update new doctor
	
	@PutMapping("update/{pid}")
	public ResponseEntity<?> updateDoctor(@RequestBody UpdateDoctorDTO newdoctor, @PathVariable Long pid)
	{
		System.out.println("in update Doctor method");
		Doctor detachedDoctor= adminService.updateDoctor(pid,newdoctor); 

		if(detachedDoctor!=null)
		return new ResponseEntity(new ApiResponse("Doctor updated successfully",true), HttpStatus.OK);
		else
		return new ResponseEntity<String>("Doctor updation unsuccessfull", HttpStatus.NOT_ACCEPTABLE);
		
	}
////////////////////////////////////////////////////////////////////////
	//Delete a doctor
	@DeleteMapping("/delete/{pid}")
	public ResponseEntity<String> deleteDoctor(@PathVariable Long pid)
	{
			System.out.println("inside admin controller and delete Doctor method");		
					
				return new ResponseEntity(new ApiResponse(this.adminService.deleteDoctor(pid),true),HttpStatus.OK);
						
	}
///////////////////////////////////////////////////////////////////////	
	//view all Doctors
	@GetMapping("/showalldoctors")
	public ResponseEntity<List<DoctorDTO>> showDoctors()
	{
		List<DoctorDTO> allDoctors=adminService.showDoctors();
		allDoctors.forEach(l->System.out.println(l));
		return new ResponseEntity<>(allDoctors, HttpStatus.OK);
		
	}
}
