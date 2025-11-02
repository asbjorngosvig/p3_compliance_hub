package com.compliancehub.service;

import com.compliancehub.dto.dataprocessor.DataProcessorGetByIdResponse;
import com.compliancehub.model.DataProcessor;
import com.compliancehub.repository.DataProcessorRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;


import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@SpringBootTest
@AutoConfigureMockMvc
class DataProcessorServiceTest {

    @Mock
    private DataProcessorRepository dataProcessorRepository;
    @Autowired
    private DataProcessorService dataProcessorService;
    @Autowired
    private MockMvc mockMvc;

    private DataProcessor dataProcessor;

    @BeforeEach
    void setUp() {
        dataProcessorRepository.deleteAll();

        dataProcessor = new DataProcessor();
        dataProcessor.setId(1L);
        dataProcessor.setName("testDataProcessor");
        dataProcessor.setHosting_location("testHostingLocation");
        dataProcessor.setService("CloudStorage");
        dataProcessor.setPurpose("dataBackup");
        dataProcessor.setNote("testNote");
        dataProcessor.setWebsite("https://example.com");

        dataProcessorRepository.save(dataProcessor);
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
