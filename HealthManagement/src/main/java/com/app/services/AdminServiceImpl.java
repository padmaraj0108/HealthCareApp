package com.app.services;

import java.util.List;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.Exceptions.ResourceNotFoundException;

import com.app.payloads.DoctorDTO;
import com.app.payloads.UpdateDoctorDTO;
import com.app.pojos.Doctor;
import com.app.repositories.UserRepo;
import com.app.repositories.DoctorRepo;

@Service
@Transactional
public class AdminServiceImpl implements AdminService {
	@Autowired
	private ModelMapper modelMapper;
	
	@Autowired
	private UserRepo userRepo;
	
	@Autowired
	private DoctorRepo DoctorRepo;

//////////////////////////////////////////////////////////
	//Add new Doctor
	@Override
	public Doctor addNewDoctor(DoctorDTO newDoctor) {
		Doctor newlyAddedDoctor=this.modelMapper.map(newDoctor, Doctor.class);//dtoToPolicy(newDoctor);
		return DoctorRepo.save(newlyAddedDoctor);
	}

	
/////////////////////////////////////////////////////////////
	//update doctor details
	@Override
	public Doctor updateDoctor(Long pid, UpdateDoctorDTO newdoctor) {
		Doctor doctorTobeUpdated=DoctorRepo.findById(pid).orElseThrow(()->new ResourceNotFoundException("Doctor Not found"));
		doctorTobeUpdated.setFirstName(newdoctor.getFirstName());
		doctorTobeUpdated.setLast_name(newdoctor.getLast_name());
		doctorTobeUpdated.setEmail(newdoctor.getEmail());
		doctorTobeUpdated.setHospital_name(newdoctor.getHospital_name());
		doctorTobeUpdated.setDesease_name(newdoctor.getDesease_name());
		return DoctorRepo.save(doctorTobeUpdated);
	}
////////////////////////////////////////////////////////////////

//Delete a Doctor
	@Override
	public String deleteDoctor(Long pid) {
		Doctor doctorTobeDeleted=DoctorRepo.findById(pid).orElseThrow(()->new ResourceNotFoundException("Doctor does not Exist"));
		if(doctorTobeDeleted!=null)
		{
			if(doctorTobeDeleted.getDoctorappointments().isEmpty())
			{
				DoctorRepo.delete(doctorTobeDeleted);
			return "deleted successfully...!";
			}
			
				return "Doctor cant be deleted since Patient is attached with doctor...!";
			
			
			
		}
		return "Doctor not found...!";
	}

////////////////////////////////////////////////////////////
	//show all doctors
	@Override
	public List<DoctorDTO> showDoctors() {
		List<Doctor>doctorslist=DoctorRepo.findAll();
		List<DoctorDTO> list=doctorslist.stream().map(doctor->new DoctorDTO(doctor.getId(),doctor.getFirstName(),doctor.getLast_name(),doctor.getEmail(),doctor.getHospital_name(),doctor.getDesease_name())).collect(Collectors.toList());
		return list;
	}
	
//////////////////////////////////////////////////////////////
	
	
}
