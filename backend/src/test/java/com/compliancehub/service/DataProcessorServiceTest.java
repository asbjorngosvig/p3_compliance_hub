package com.compliancehub.service;

import com.compliancehub.dto.DataProcessorDTO;
import com.compliancehub.model.DataProcessor;
import com.compliancehub.repository.DataProcessorRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Sort;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

//fra jUnit5. init mocks så det ik skal gøres længere nede
@ExtendWith(MockitoExtension.class)
class DataProcessorServiceTest {

    @Mock
    private DataProcessorRepository dataProcessorRepository;

    @Mock
    private DPAService dpaService;

    @InjectMocks
    private DataProcessorService dataProcessorService;

    @Test
    void create_shouldReturnCreatedDataProcessor() {
        UUID id = UUID.randomUUID();
        DataProcessorDTO.CreateRequest request = new DataProcessorDTO.CreateRequest(
                "Test DP", List.of("Loc1"), "Service", "Purpose", "Note", "https://example.com"
        );

        DataProcessor saved = new DataProcessor();
        saved.setId(id);
        saved.setName(request.name());
        saved.setProcessingLocations(request.processingLocations());
        saved.setService(request.service());
        saved.setPurpose(request.purpose());
        saved.setNote(request.note());
        saved.setWebsite(request.website());

        when(dataProcessorRepository.save(any(DataProcessor.class))).thenReturn(saved);

        DataProcessorDTO.CreateResponse response = dataProcessorService.create(request);

        assertEquals(id, response.createdDataProcessor().id());
        assertEquals("Test DP", response.createdDataProcessor().name());

        verify(dataProcessorRepository, times(1)).save(any(DataProcessor.class));
    }

    @Test
    void getAll_shouldReturnMappedDTOs() {
        DataProcessor dp1 = new DataProcessor(UUID.randomUUID(), "A", List.of("Loc1"),
                "Service1", "Purpose1", "Note1", "https://site1.com", null);
        DataProcessor dp2 = new DataProcessor(UUID.randomUUID(), "B", List.of("Loc2"),
                "Service2", "Purpose2", "Note2", "https://site2.com", null);

        when(dataProcessorRepository.findAll(Sort.by("name").ascending()))
                .thenReturn(List.of(dp1, dp2));
        when(dataProcessorRepository.count()).thenReturn(2L);

        DataProcessorDTO.GetAllResponse response = dataProcessorService.getAll();

        assertEquals(2, response.allDataProcessors().size());
        assertEquals("A", response.allDataProcessors().get(0).name());
        assertEquals("B", response.allDataProcessors().get(1).name());
        assertEquals(2L, response.totalCount());
        verify(dataProcessorRepository, times(1)).findAll(Sort.by("name").ascending());
        verify(dataProcessorRepository, times(1)).count();
    }

    @Test
    void delete_shouldDeleteWhenIdExists() {
        UUID id = UUID.randomUUID();

        // 1) Mock: vi fortæller repository at "ja, den findes"
        when(dataProcessorRepository.existsById(id)).thenReturn(true);

        // 2) Call: vi kalder servicen
        dataProcessorService.delete(id);

        // 3) Verify: servicen skal først tjekke om ID findes
        verify(dataProcessorRepository, times(1)).existsById(id);

        // 4) Verify: servicen skal derefter slette det rigtige ID
        verify(dataProcessorRepository, times(1)).deleteById(id);
    }

    @Test
    void delete_shouldThrowWhenIdDoesNotExist() {
        UUID id = UUID.randomUUID();

        // 1) Mock: repository siger "nej, den findes ikke"
        when(dataProcessorRepository.existsById(id)).thenReturn(false);

        // 2) Assert: delete skal kaste din valgte exception
        assertThrows(
            NoSuchElementException.class,
            () -> dataProcessorService.delete(id)
        );

        // 3) Verify: deleteById må IKKE blive kaldt når ID ikke findes
        verify(dataProcessorRepository, never()).deleteById(any());
    }

}