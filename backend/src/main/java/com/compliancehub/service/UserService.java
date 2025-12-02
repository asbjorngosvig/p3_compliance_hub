package com.compliancehub.service;

import com.compliancehub.dto.user.UserDTO;
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
import java.util.UUID;

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

    public UserDTO.UserResponse registerUser(UserDTO.CreateRequest createRequest) {
        User user = new Admin();
        user.setPassword(bCryptPasswordEncoder.encode(createRequest.password()));
        user.setEmail(createRequest.email());
        user.setName("name");

        User savedUser = userRepository.save(user);

        return new UserDTO.UserResponse(
                savedUser.getId(),
                savedUser.getName(),
                savedUser.getEmail(),
                savedUser.getRole()
        );
    }

    public UserDTO.UserResponse getById(UUID id) {
        Optional<User> optionalUser = userRepository.findById(id);

        // make sure that user exists before returning
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            return new UserDTO.UserResponse(
                    user.getId(),
                    user.getEmail(),
                    user.getName(),
                    user.getRole());
        } else {
            throw new InputMismatchException("Could not find user with id: " +  id);
        }
    }

    public UserDTO.UserResponse getByEmail(String email) {
        Optional<User> optionalUser = userRepository.findByEmail(email);

        // make sure that user exists before returning
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            return new UserDTO.UserResponse(
                 user.getId(),
                 user.getEmail(),
                 user.getName(),
                 user.getRole());
        } else {
            throw new InputMismatchException("Could not find user with email: " +  email);
        }
    }


    public String verify(UserLoginDTO userLoginDTO) {

        String token;
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        userLoginDTO.username(),
                        userLoginDTO.password()
                )
        );

        Optional<User> optionalUser = userRepository.findByEmail(userLoginDTO.username());

        // make sure that user exists before returning

        if (optionalUser.isPresent()) {
            User user = optionalUser.get();

            token = jwtService.generateToken(user.getEmail(), user.getEmail(), user.getRole());
            return token;
        } else {
            throw new InputMismatchException("Invalid credentials");
        }
    }
}