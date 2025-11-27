package com.compliancehub.service;


import com.compliancehub.dto.user.UserLoginDTO;
import com.compliancehub.model.Admin;
import com.compliancehub.model.User;
import com.compliancehub.repository.UserRepository;
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
        UserLoginDTO userDTO = new UserLoginDTO("Test@test.com", "SecretPassword");

        Admin TestUser = new Admin();
        TestUser.setId(id);
        TestUser.setEmail(userDTO.username());
        TestUser.setName("name");

        when(userRepository.save(any(User.class))).thenReturn(TestUser);

        User result = userService.register(userDTO);

        verify(userRepository, times(1)).save(any(User.class));

        assertEquals(userDTO.username(), result.getEmail());

    }

    @Test
    void verifyTest(){
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

        String token = userService.verify(loginDTO);

        assertEquals("jwtToken", token);

        verify(userRepository, times(1)).findByEmail(loginDTO.username());
        verify(authenticationManager, times(1)).authenticate(any(UsernamePasswordAuthenticationToken.class));
    }

}