package com.app.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.app.payloads.AuthDto;
import com.app.pojos.Credentials;
import com.app.pojos.Users;
import com.app.repositories.UserRepo;

@CrossOrigin
@RestController
public class AuthController {
	@Autowired
	private AuthenticationManager authManager;
	@Autowired
	private JwtUtil jwtUtils;
	
	@Autowired UserRepo userRepo;
	
	@PostMapping("/authenticate")
	public ResponseEntity<AuthDto> authenticate(@RequestBody Credentials cred) {
		System.out.println("Authenticating: " + cred);
		try {
			AuthDto newAuthUser=null;
			Authentication auth = new UsernamePasswordAuthenticationToken(cred.getEmail(), cred.getPassword());
			auth = authManager.authenticate(auth);
			User user = (User)auth.getPrincipal();
			String token = jwtUtils.generateToken(user.getUsername());
			Users newUser= userRepo.findByEmail(cred.getEmail());
			System.out.println(newUser.getUserRole().name());
			if(newUser.getAddress()!=null) {
				 newAuthUser= new AuthDto(newUser.getId(), newUser.getFirstName(), newUser.getLast_name(), newUser.getEmail(), newUser.getPassword(), newUser.getDate(), newUser.getContact_no(),newUser.getGender(), token, newUser.getAddress().getCity(), newUser.getAddress().getState(), newUser.getAddress().getPincode(), newUser.getAddress().getStreet(),newUser.getUserRole().name());				
			}
			else {
				 newAuthUser= new AuthDto(newUser.getId(), newUser.getFirstName(), newUser.getLast_name(), newUser.getEmail(), newUser.getPassword(), newUser.getDate(), newUser.getContact_no(),newUser.getGender(), token,newUser.getUserRole().name());				
			}
			return ResponseEntity.ok(newAuthUser);
		}catch (BadCredentialsException e) {
			return ResponseEntity.notFound().build();
		}
	}

	private ResponseEntity<AuthDto> ResponseEntity(AuthDto authDto, HttpStatus ok) {
		// TODO Auto-generated method stub
		return null;
	}
}