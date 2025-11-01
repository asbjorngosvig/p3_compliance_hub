package com.compliancehub.service;

import com.compliancehub.dto.dataprocessor.DataProcessorGetByIdResponse;
import com.compliancehub.model.DataProcessor;
import com.compliancehub.repository.DataProcessorRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

class DataProcessorServiceTest {

    private DataProcessorService dataProcessorService;
    private DataProcessorRepository dataProcessorRepository;
    private DataProcessor dataProcessor;



    @BeforeEach
    void setUp() {

        dataProcessor = new DataProcessor();
        dataProcessor.setId(1L);
        dataProcessor.setName("testDataProcessor");
        dataProcessor.setHosting_location("testHostingLocation");
        dataProcessor.setService("CloudStorage");
        dataProcessor.setPurpose("dataBackup");
        dataProcessor.setNote("testNote");
        dataProcessor.setWebsite("https://example.com");

        dataProcessorRepository.deleteAll();
        when(dataProcessorRepository.findById(1L)).thenReturn(Optional.of(dataProcessor));
    }

    @Test
    void testGetById(){

        DataProcessorGetByIdResponse response = dataProcessorService.getById(1L);

        assertEquals(1L, response.id());
        assertEquals("testDataProcessor", response.name());
        assertEquals("testHostingLocation", response.hosting_location());
        assertEquals("CloudStorage", response.service());
        assertEquals("dataBackup", response.purpose());
        assertEquals("testNote", response.note());
        assertEquals("https://example.com", response.website());
    }
}
