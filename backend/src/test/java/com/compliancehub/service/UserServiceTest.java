/*
package com.compliancehub.service;

import com.compliancehub.model.User;
import com.compliancehub.repository.DataProcessorRepository;
import com.compliancehub.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

public class UserServiceTest {

    private UserService userService;
    private UserRepository userRepository;
    private User user;

    @BeforeEach
    void setUp() {

        user = new User();
        user.setId(1L);
        user.setName("testDataProcessor");
        user.setHosting_location("testHostingLocation");
        user.setService("CloudStorage");
        user.setPurpose("dataBackup");
        user.setNote("testNote");
        user.setWebsite("https://example.com");

        userRepository.deleteAll();
        when(userRepository.findById(1L)).thenReturn(Optional.of(user));
    }

    @Test
    void testGetById(){

        UserGetByIdResponse response = userService.getById(1L);

        assertEquals(1L, response.id());
        assertEquals("testDataProcessor", response.name());
        assertEquals("testHostingLocation", response.hosting_location());
        assertEquals("CloudStorage", response.service());
        assertEquals("dataBackup", response.purpose());
        assertEquals("testNote", response.note());
        assertEquals("https://example.com", response.website());
    }

}
*/