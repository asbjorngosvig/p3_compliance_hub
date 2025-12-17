package com.compliancehub.controller;

import com.compliancehub.dpa_manager.DPAController;
import com.compliancehub.dpa_manager.DPA_DTO;
import com.compliancehub.mockClasses.MockDPA;
import com.compliancehub.dpa_manager.DPA;
import com.compliancehub.dpa_manager.DPAService;
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


import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(MockitoExtension.class)
class DPAControllerTest {

    private MockMvc mockMvc;

    @Mock
    private DPAService dpaService;

    @InjectMocks
    private DPAController controller;

    private final ObjectMapper objectMapper = new ObjectMapper();

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(controller).build();
    }

    @Test
    void create_shouldReturnCreatedDPA() throws Exception {
        // Arrange
        UUID newId = UUID.randomUUID();
        // Request DTO (Input)
        DPA_DTO.CreateRequest req = new DPA_DTO.CreateRequest(
                List.of("DENMARK", "SWEDEN"),
                true,
                30,
                "microsoft",
                "UNIflow",
                "http://example.com"
        );

        // Response DTO (Output fra mock service)
        DPA_DTO.StandardDPAResponse standardResponse = new DPA_DTO.StandardDPAResponse(
                newId,
                new ArrayList<>(),
                "Test Customer",
                "Test Product",
                LocalDateTime.now(),
                "http://example.com"
        );

        DPA_DTO.CreateResponse createResponse = new DPA_DTO.CreateResponse(standardResponse);

        // Mock servicen
        when(dpaService.create(any(DPA_DTO.CreateRequest.class))).thenReturn(createResponse);

        // Act & Assert
        mockMvc.perform(post("/dpa/")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(req)))
            .andExpect(status().isCreated()) // Forventer 201 Created
            .andExpect(header().string("Location", "/dpa/" + newId)) // Tjekker Location header
            .andExpect(jsonPath("$.createdDPA.id").value(newId.toString()))
            .andExpect(jsonPath("$.createdDPA.customerName").value("Test Customer"));
    }


    @Test
    void getAll_shouldReturnListOfDPA() throws Exception {
        DPA DPA1 = MockDPA.getMock();
        DPA1.setCustomerName("customer1");

        DPA DPA2 = MockDPA.getMock();
        DPA2.setCustomerName("customer2");

        DPA_DTO.StandardDPAResponse DTO1 = new DPA_DTO.StandardDPAResponse(DPA1.getId(), new ArrayList<>(), DPA1.getCustomerName(), DPA1.getProductName(), DPA1.getCreatedDate(),DPA1.getFileUrl());
        DPA_DTO.StandardDPAResponse DTO2 = new DPA_DTO.StandardDPAResponse(DPA2.getId(), new ArrayList<>(), DPA2.getCustomerName(), DPA2.getProductName(), DPA2.getCreatedDate(), DPA2.getFileUrl());

        DPA_DTO.GetAllResponse getAllResponse = new DPA_DTO.GetAllResponse(List.of(DTO1, DTO2), 2L);

        when(dpaService.getAll()).thenReturn(getAllResponse);
        mockMvc.perform(get("/dpa/"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.dpas.length()").value(2))
                .andExpect(jsonPath("$.dpas[0].customerName").value("customer1"))
                .andExpect(jsonPath("$.dpas[1].customerName").value("customer2"))
                .andExpect(jsonPath("$.totalCount").value(2));
    }


}