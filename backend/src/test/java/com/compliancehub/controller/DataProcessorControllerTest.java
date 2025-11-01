package com.compliancehub.controller;



import com.compliancehub.repository.DataProcessorRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.junit.jupiter.api.Assertions.assertEquals;
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
    /*
    @BeforeEach
    void setUp() {
        DataProcessor dataProcessor = new DataProcessor();
        dataProcessor.setName("testProcessor");
        dataProcessor.setHosting_location("USA");
        dataProcessor.setService("cloudStorage");
        dataProcessor.setPurpose("dataBackup");
        dataProcessor.setNote("testNote");
        dataProcessor.setWebsite("https://example.com");

        dataProcessorRepository.deleteAll();
        dataProcessorRepository.save(dataProcessor);
    }
    */

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
        .andExpect(jsonPath("$.id").value(1L))
        .andExpect(jsonPath("$.hosting_location").value("testLocation"))
        .andExpect(jsonPath("$.service").value("testService"))
        .andExpect(jsonPath("$.purpose").value("testPurpose"))
        .andExpect(jsonPath("$.note").value("testNote"))
        .andExpect(jsonPath("$.website").value("testWebsite"));
    }
}
