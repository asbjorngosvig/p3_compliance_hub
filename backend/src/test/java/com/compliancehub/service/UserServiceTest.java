package com.compliancehub.service;


import com.compliancehub.shared.security.JWTService;
import com.compliancehub.user_manager.UserService;
import com.compliancehub.user_manager.dto.UserDTO;
import com.compliancehub.user_manager.dto.UserLoginDTO;
import com.compliancehub.user_manager.Admin;
import com.compliancehub.user_manager.User;
import com.compliancehub.user_manager.UserRepository;
import org.junit.jupiter.api.Test;

import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private JWTService jwtService;

    @Mock
    private AuthenticationManager authenticationManager;

    @InjectMocks
    private UserService userService;

    @Test
    void registerTest(){
        UUID id = UUID.randomUUID();

        UserDTO.CreateRequest createRequest = new UserDTO.CreateRequest(
            "TestUser",
            "Test@test.com",
            "SecretPassword",
            "ADMIN"
        );

        Admin testUser = new Admin();
        testUser.setId(id);
        testUser.setEmail(createRequest.email());
        testUser.setName(createRequest.name());
        testUser.setRole(createRequest.role());

        when(userRepository.save(any(User.class))).thenReturn(testUser);

        UserDTO.UserResponse result = userService.registerUser(createRequest);

        verify(userRepository, times(1)).save(any(User.class));

        assertEquals(createRequest.email(), result.email());
        assertEquals(createRequest.name(), result.name());
        assertEquals(createRequest.role(), result.role());

    }

    @Test
    void loginTest(){
        UUID id = UUID.randomUUID();
        UserLoginDTO loginDTO = new UserLoginDTO("Test@test.com", "SecretPassword");

        User testUser = new Admin();
        testUser.setId(id);
        testUser.setEmail(loginDTO.username());
        testUser.setName("TestName");
        testUser.setRole("ADMIN");

        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class))).thenReturn(null);

        when(userRepository.findByEmail(loginDTO.username())).thenReturn(Optional.of(testUser));
        when(jwtService.generateToken(testUser.getEmail(), testUser.getEmail(), testUser.getRole())).thenReturn("jwtToken");

        String token = userService.login(loginDTO);

        assertEquals("jwtToken", token);

        verify(userRepository, times(1)).findByEmail(loginDTO.username());
        verify(authenticationManager, times(1)).authenticate(any(UsernamePasswordAuthenticationToken.class));
    }

}