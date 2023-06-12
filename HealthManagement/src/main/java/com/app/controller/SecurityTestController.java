package com.app.controller;

import java.security.Principal;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
public class SecurityTestController {
	@GetMapping("/admin/test")
	public String testAdmin(Principal principal) {
		return "Welcome, Admin - " + principal.getName() + "!";
	}
	@GetMapping("/user/test")
	public String testUser(Principal principal) {
		return "Welcome, Users - " + principal.getName() + "!";
	}
}
