package com.compliancehub.service;

import com.compliancehub.dto.user.UserGetUserResponse;
import com.compliancehub.dto.user.UserLoginDTO;
import com.compliancehub.model.Admin;
import com.compliancehub.model.User;
import com.compliancehub.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
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

    private final BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder(12);

    public User register(UserLoginDTO userDTO){
        User user = new Admin();
        user.setPassword(bCryptPasswordEncoder.encode(userDTO.password()));
        user.setEmail(userDTO.username());
        user.setName("name");

        return userRepository.save(user);
    }

    public UserGetUserResponse getById(long id) {
        Optional<User> optionalUser = userRepository.findById(id);

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


    public String verify(UserLoginDTO userLoginDTO) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        userLoginDTO.username(),
                        userLoginDTO.password()
                )
        );

        User user = userRepository.findByEmail(userLoginDTO.username());
        if (user == null) {
            throw new InputMismatchException("Invalid credentials");
        }

        String token = jwtService.generateToken(user.getEmail(), user.getId(), user.getRole());

        return token;
    }
}