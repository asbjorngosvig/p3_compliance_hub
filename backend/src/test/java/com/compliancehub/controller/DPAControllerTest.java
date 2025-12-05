package com.compliancehub.controller;

import com.compliancehub.dto.DPA_DTO;
import com.compliancehub.model.Requirement;
import com.compliancehub.model.CommunicationStrategy;
import com.compliancehub.service.DPAService;
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
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
// import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
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
                new ArrayList<>(), // Empty requirements
                new ArrayList<>(), // Empty strategies
                "Test Customer",
                "Test Product",
                "http://example.com"
        );

        // Response DTO (Output fra mock service)
        DPA_DTO.StandardDPAResponse standardResponse = new DPA_DTO.StandardDPAResponse(
                newId,
                new ArrayList<>(),
                new ArrayList<>(),
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
            .andExpect(jsonPath("$.createDPA.id").value(newId.toString()))
            .andExpect(jsonPath("$.createDPA.customerName").value("Test Customer"));
    }

    // --- UDKOMMENTERET TEST (Venter på implementering af GetAll) ---
    /*
    @Test
    void getAll_shouldReturnListOfDPA() throws Exception {
        UUID id1 = UUID.randomUUID();
        UUID id2 = UUID.randomUUID();

        List<Violation> violations = new ArrayList<>();

        // PROBLEMET HER: DPA_DTO.DPAResponse findes ikke i din nuværende DTO
        // Du skal oprette en record i DPA_DTO der hedder 'GetAllResponse' og 'DPAResponse'
        // før denne test kan køre.

        // DPA_DTO.DPAResponse dpa1 = new DPA_DTO.DPAResponse(
        //         id1, violations,"customer1", "product1"
        // );

        // DPA_DTO.DPAResponse dpa2 = new DPA_DTO.DPAResponse(
        //         id2, violations,"customer2", "product2"
        // );

        // DPA_DTO.GetAllResponse getAllResponse = new DPA_DTO.GetAllResponse(
        //         List.of(dpa1, dpa2), 2L, "Date created", "Ascending"
        // );

        // when(dpaService.getAll()).thenReturn(getAllResponse);

        // mockMvc.perform(get("/dpa/"))
        //         .andExpect(status().isOk())
        //         .andExpect(jsonPath("$.allDPA.length()").value(2))
        //         .andExpect(jsonPath("$.allDPA[0].customerName").value("customer1"))
        //         .andExpect(jsonPath("$.allDPA[1].customerName").value("customer2"))
        //         .andExpect(jsonPath("$.totalCount").value(2));
    }
    */

}