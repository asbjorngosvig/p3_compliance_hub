package com.compliancehub.controller;

import com.compliancehub.dto.DataProcessorDTO;
import com.compliancehub.service.DataProcessorService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.List;
import java.util.UUID;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

//fra jUnit5. init mocks så det ik skal gøres længere nede
@ExtendWith(MockitoExtension.class)
class DataProcessorControllerTest {

    private MockMvc mockMvc;

    @Mock
    private DataProcessorService service;

    @InjectMocks
    private DataProcessorController controller;

    private final ObjectMapper objectMapper = new ObjectMapper();

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(controller).build();
    }

    @Test
    void create_shouldReturnCreatedResponse() throws Exception {
        UUID id = UUID.randomUUID();

        //init af fake DP
        //herefter wrappe dp'en i create DTO (så entity ik exposes til api. se mainkoden for mere info)
        DataProcessorDTO.StandardDataProcessorResponse dp = new DataProcessorDTO.StandardDataProcessorResponse(
            id, "Test DP", List.of("Loc1"), "Service", "Purpose", "Note", "https://example.com"
        );
        DataProcessorDTO.CreateResponse createResponse = new DataProcessorDTO.CreateResponse(dp);

        //forklarer hvad mock-servicen skal gøre når .create kaldes.
        //.any siger den accepterer ethvert objekt af DataProcessorDTO.CreateRequest klassen
        when(service.create(any(DataProcessorDTO.CreateRequest.class))).thenReturn(createResponse);

        //det info mock requesten fra frontenden kommer med. det er et objekt som skal laves til json
        //hvilket sker lidt længere nede
        DataProcessorDTO.CreateRequest request = new DataProcessorDTO.CreateRequest(
            "Test DP", List.of("Loc1"), "Service", "Purpose", "Note", "https://example.com"
        );

        mockMvc.perform(post("/dataprocessors")
                .contentType(MediaType.APPLICATION_JSON)
                //omdanner request-objektet til json
                .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isCreated())
            .andExpect(jsonPath("$.createdDataProcessor.id").value(id.toString()))
            .andExpect(jsonPath("$.createdDataProcessor.name").value("Test DP"));
    }

    @Test
    void getAll_shouldReturnListOfDataProcessors() throws Exception {
        UUID id1 = UUID.randomUUID();
        UUID id2 = UUID.randomUUID();

        //init af fake DP'er til liste af DP'er
        DataProcessorDTO.StandardDataProcessorResponse dp1 = new DataProcessorDTO.StandardDataProcessorResponse(
            id1, "A", List.of("Loc1"), "Service1", "Purpose1", "Note1", "https://site1.com"
        );
        DataProcessorDTO.StandardDataProcessorResponse dp2 = new DataProcessorDTO.StandardDataProcessorResponse(
            id2, "B", List.of("Loc2"), "Service2", "Purpose2", "Note2", "https://site2.com"
        );

        //sætte dem i liste og wrappe dem i getAll DTO'en
        DataProcessorDTO.GetAllResponse getAllResponse = new DataProcessorDTO.GetAllResponse(
            List.of(dp1, dp2), 2L, "Alphabetical", "Ascending"
        );

        when(service.getAll()).thenReturn(getAllResponse);

        mockMvc.perform(get("/dataprocessors"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.allDataProcessors.length()").value(2))
            .andExpect(jsonPath("$.allDataProcessors[0].name").value("A"))
            .andExpect(jsonPath("$.allDataProcessors[1].name").value("B"))
            .andExpect(jsonPath("$.totalCount").value(2));
    }
    
    @Test
    void delete_shouldReturnNoContent() throws Exception {
        UUID id = UUID.randomUUID();

        doNothing().when(service).delete(id);

        mockMvc.perform(delete("/dataprocessors/" + id))
            .andExpect(status().isNoContent());

        verify(service, times(1)).delete(id);
    }
}
