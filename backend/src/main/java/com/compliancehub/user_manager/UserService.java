package com.compliancehub.user_manager;

import com.compliancehub.shared.security.JWTService;
import com.compliancehub.user_manager.dto.UserDTO;
import com.compliancehub.user_manager.dto.UserLoginDTO;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.InputMismatchException;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final JWTService jwtService;
    private final AuthenticationManager authenticationManager;

    private final BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder(12);

    public UserService(UserRepository userRepository, JWTService jwtService, AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
    }

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


    public String login(UserLoginDTO userLoginDTO) {

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
            throw new NoSuchElementException("Invalid credentials");
        }
    }
}