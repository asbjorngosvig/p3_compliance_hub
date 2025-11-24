package com.compliancehub.service;


import com.compliancehub.model.UserPrincipal;
import com.compliancehub.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import com.compliancehub.model.User;


@Service
public class MyUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        User user = userRepository.findByEmail(username);
        if (user == null) { // ADDED - explicit null check
            throw new UsernameNotFoundException("User not found with email: " + username);
        }
        return new UserPrincipal(user);
    }
}
