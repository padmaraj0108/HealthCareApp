package com.app.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.payloads.ApiResponse;
import com.app.payloads.RegisterUserDTO;
import com.app.pojos.Users;
import com.app.services.UserService;

@RestController
@RequestMapping("/home")
@CrossOrigin(origins ="http://localhost:3000")
public class HomeController {
	public HomeController() {
		// TODO Auto-generated constructor stub
		System.out.println("int the ctor of "+getClass().getName());
	}
	
	@Autowired
	private UserService userService;
	
//	@GetMapping
//	public String ShowHomePage()
//	{
//		System.out.println("in the show home page method");
//		return "index";
//		
//	}
	
////////////////////////////////////////////////////////////////////////
	//Register a newuser
	
	@PostMapping("/register")
	public ResponseEntity<?> registerUser(@RequestBody RegisterUserDTO user)
	{
		System.out.println("date......"+user.getDate());
		System.out.println("inside user controller and register mapping");
		
		Users createdUser=this.userService.createUser(user);
		String msg="";
		if(createdUser!=null) {
			msg="user added Successfully";
		}
		else {
			msg= "user not added";
		}
		return new ResponseEntity(new ApiResponse(msg,true),HttpStatus.CREATED);
		
		
	}
///////////////////////////////////////////////////////////////////////////////////	

}
