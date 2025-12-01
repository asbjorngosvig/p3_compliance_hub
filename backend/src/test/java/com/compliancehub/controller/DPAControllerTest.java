package com.compliancehub.controller;

import com.compliancehub.dto.DPADTO;
import com.compliancehub.dto.DataProcessorDTO;
import com.compliancehub.model.Violation;
import com.compliancehub.service.DPAService;
import com.compliancehub.service.DataProcessorService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
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
    void getAll_shouldReturnListOfDPA() throws Exception {
        UUID id1 = UUID.randomUUID();
        UUID id2 = UUID.randomUUID();

        List<Violation> violations = new ArrayList<>();

        //init af fake DPa'er til liste af DPa'er
        DPADTO.DPAResponse dpa1 = new DPADTO.DPAResponse(
                id1, violations,"customer1", "product1"
        );

        DPADTO.DPAResponse dpa2 = new DPADTO.DPAResponse(
                id2, violations,"customer2", "product2"
        );

        //sætte dem i liste og wrappe dem i getAll DTO'en
        DPADTO.GetAllResponse getAllResponse = new DPADTO.GetAllResponse(
                List.of(dpa1, dpa2), 2L, "Date created", "Ascending"
        );

        when(dpaService.getAll()).thenReturn(getAllResponse);

        mockMvc.perform(get("/dpa/"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.allDPA.length()").value(2))
                .andExpect(jsonPath("$.allDPA[0].customerName").value("customer1"))
                .andExpect(jsonPath("$.allDPA[1].customerName").value("customer2"))
                .andExpect(jsonPath("$.allDPA[0].productName").value("product1"))
                .andExpect(jsonPath("$.allDPA[1].productName").value("product2"))
                .andExpect(jsonPath("$.totalCount").value(2));

    }

}