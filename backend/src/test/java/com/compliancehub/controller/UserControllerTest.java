package com.compliancehub.controller;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import com.compliancehub.dto.user.UserGetUserResponse;
import com.compliancehub.model.Admin;
import com.compliancehub.model.User;
import com.compliancehub.repository.UserRepository;
import com.compliancehub.service.UserService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.ResponseEntity;

import org.springframework.test.web.servlet.MockMvc;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private UserRepository userRepository;
    @BeforeEach
    void setUp() {
        User user = new Admin();
        user.setRole("ADMIN"); user.setPassword("testPassword");
        user.setEmail("test@email.com");
        user.setName("testName");


        userRepository.deleteAll(); // Ensure a clean database before each test
        userRepository.save(user);
    }

    @Test
    void testGetByEmail() throws Exception {
        mockMvc.perform(get("/users/email/test@email.com"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("testName"))
                .andExpect(jsonPath("$.email").value("test@email.com"));
        assertEquals("a", "a");
    }
}