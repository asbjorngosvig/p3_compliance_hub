package com.compliancehub.service;

import com.compliancehub.dto.user.UserGetUserResponse;
import com.compliancehub.model.User;
import com.compliancehub.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.InputMismatchException;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JWTService jwtService;

    @Autowired
    AuthenticationManager authenticationManager;

    private BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder(12);

    public User register(User user){
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public UserGetUserResponse getById(long id) {
        Optional<User> optionalUser = userRepository.findById((int) id);

        // make sure that user exists before returning
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            return new UserGetUserResponse(user.getId(), user.getEmail(), user.getName(), user.getRole());
        } else {
            throw new InputMismatchException("Could not find user with id: " +  id);
        }
    }

    public UserGetUserResponse getByEmail(String email) {
        User user = userRepository.findByEmail(email);

        // make sure that user exists before returning
        if (user != null) {
            return new UserGetUserResponse(user.getId(), user.getEmail(), user.getName(), user.getRole());
        } else {
            throw new InputMismatchException("Could not find user with email: " +  email);
        }
    }


    public String verify(User user) {
        Authentication authentication =
                authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword()));

        if(authentication.isAuthenticated()) {
            return jwtService.generateToken(user.getEmail());
        }
        return "fail";
    }
}