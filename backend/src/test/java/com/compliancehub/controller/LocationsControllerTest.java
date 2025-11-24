package com.compliancehub.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc(addFilters = false)
class LocationsControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void getAllLocations_ok() throws Exception {
        mockMvc.perform(get("/locations"))
                .andExpect(status().isOk());
    }

    @Test
    void search_ok() throws Exception {
        mockMvc.perform(get("/locations/den"))
                .andExpect(status().isOk());
    }
}
