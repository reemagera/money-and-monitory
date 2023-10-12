package com.example.securityservice.config;

import com.example.securityservice.entity.UserCredential;
import com.example.securityservice.repository.UserCredentialRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.Optional;

public class CustomUserDetailsService implements UserDetailsService {
    @Autowired
    private UserCredentialRepository repository;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<UserCredential> credential = repository.findByCustomerID(username);
        return credential.map(CustomUserDetails::new).orElseThrow(() -> new UsernameNotFoundException("Customer ID not found with ID: " + username));
    }
}
