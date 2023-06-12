package com.app.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.pojos.Users;
import com.app.repositories.UserRepo;


@Transactional
@Service
public class AppUserDetailsService implements UserDetailsService {
	@Autowired
	private UserRepo userDao;
	
	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		Users user = userDao.findByEmail(email);
		if(user == null)
			throw new UsernameNotFoundException(email + " not found.");
		return user.toUser();
	}
}
