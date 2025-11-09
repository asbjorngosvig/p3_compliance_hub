package com.compliancehub.controller;

import com.compliancehub.model.DataProcessor;
import com.compliancehub.repository.DataProcessorRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
class DataProcessorControllerTest {

    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private DataProcessorRepository dataProcessorRepository;


    @Test
    void testGetDataProcessorByid() throws Exception {
        dataProcessorRepository.deleteAll();
        DataProcessor dataProcessor = new DataProcessor();
        dataProcessor.setName("testProcessor");
        // dataProcessor.setProcessingLocations();
        dataProcessor.setService("testService");
        dataProcessor.setPurpose("testPurpose");
        dataProcessor.setNote("testNote");
        dataProcessor.setWebsite("testWebsite");

        dataProcessorRepository.save(dataProcessor);

        mockMvc.perform(get("/dataprocessors/1"))

        .andExpect(status().isCreated())
        .andExpect(jsonPath("$.id").value(1L))
        // .andExpect(jsonPath("$.hosting_location").value("testLocation"))
        .andExpect(jsonPath("$.service").value("testService"))
        .andExpect(jsonPath("$.purpose").value("testPurpose"))
        .andExpect(jsonPath("$.note").value("testNote"))
        .andExpect(jsonPath("$.website").value("testWebsite"));
    }

    /*
    @Test
    void testCreateDataProcessor() throws Exception {
        mockMvc.perform(post("/dataprocessors/")
        .contentType(MediaType.APPLICATION_JSON)
        .content("{\"name\":\"testName\","+
            "\"hosting_location\":\"testLocation\","+
            "\"service\":\"testService\","+
            "\"purpose\":\"testPurpose\","+
            "\"note\":\"testNote\","+
            "\"website\":\"testWebsite\"}"))

        .andExpect(status().isCreated())
        .andExpect(jsonPath("$.id").value(2L)) //Running 2l instead of 1 due to it already being created earlier in test of getById test
        // .andExpect(jsonPath("$.hosting_location").value("testLocation"))
        .andExpect(jsonPath("$.service").value("testService"))
        .andExpect(jsonPath("$.purpose").value("testPurpose"))
        .andExpect(jsonPath("$.note").value("testNote"))
        .andExpect(jsonPath("$.website").value("testWebsite"));
    }

     */


}
