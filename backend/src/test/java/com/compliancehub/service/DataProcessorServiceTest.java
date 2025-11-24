package com.compliancehub.service;

import com.compliancehub.dto.DataProcessorDTO;
import com.compliancehub.model.DataProcessor;
import com.compliancehub.repository.DataProcessorRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.data.domain.Sort;

import java.util.List;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

class DataProcessorServiceUnitTest {

    //se data processor controller test for forklaring af de fleste felter.
    @Mock
    private DataProcessorRepository dataProcessorRepository;

    @InjectMocks
    private DataProcessorService dataProcessorService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void create_shouldReturnCreatedDataProcessor() {
        // laver req med fake DTO (det input service-metoden modtager)
        UUID id = UUID.randomUUID();
        DataProcessorDTO.CreateRequest request = new DataProcessorDTO.CreateRequest(
            "Test DP", List.of("Loc1"), "Service", "Purpose", "Note", "http://example.com"
        );

        // vi mock-gemmer da der ingen database er. repository er fake
        // dette er det objekt repository.save() skal returnere, som hvis det blev gemt i DB
        DataProcessor saved = new DataProcessor();
        saved.setId(id);
        saved.setName(request.name());
        saved.setProcessingLocations(request.processingLocations());
        saved.setService(request.service());
        saved.setPurpose(request.purpose());
        saved.setNote(request.note());
        saved.setWebsite(request.website());

        when(dataProcessorRepository.save(any(DataProcessor.class))).thenReturn(saved);

        // vi kalder mock-service metoden for create
        DataProcessorDTO.CreateResponse response = dataProcessorService.create(request);

        // vi tjekker at felterne er korrekte og matcher "saved" aka det der burde være gemt
        // hvis db eksisterede
        assertEquals(id, response.createdDataProcessor().id());
        assertEquals("Test DP", response.createdDataProcessor().name());

        // verify = check at save() blev kaldt præcis én gang
        verify(dataProcessorRepository, times(1)).save(any(DataProcessor.class));
    }


    @Test
    void getAll_shouldReturnMappedDTOs() {
        DataProcessor dp1 = new DataProcessor(UUID.randomUUID(), "A", List.of("Loc1"), "Service1", "Purpose1", "Note1", "http://site1.com", null);
        DataProcessor dp2 = new DataProcessor(UUID.randomUUID(), "B", List.of("Loc2"), "Service2", "Purpose2", "Note2", "http://site2.com", null);

        when(dataProcessorRepository.findAll(Sort.by("name").ascending())).thenReturn(List.of(dp1, dp2));
        when(dataProcessorRepository.count()).thenReturn(2L);

        DataProcessorDTO.GetAllResponse response = dataProcessorService.getAll();

        assertEquals(2, response.allDataProcessors().size());
        assertEquals("A", response.allDataProcessors().get(0).name());
        assertEquals("B", response.allDataProcessors().get(1).name());
        assertEquals(2L, response.totalCount());
        verify(dataProcessorRepository, times(1)).findAll(Sort.by("name").ascending());
        verify(dataProcessorRepository, times(1)).count();
    }
}