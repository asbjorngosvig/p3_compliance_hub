package com.compliancehub.dpa_manager.builder;

import com.compliancehub.dpa_manager.DPA;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;

public class DPABuilderTest {

    public DPABuilder dpaBuilder;

    @BeforeEach
    void setUp() {
        dpaBuilder = new DPABuilder("customer", "product", "https://url.com");
    }

    @Test
    void withWrittenApprovalTest() {
        // Vi simulerer "NeedWrittenApproval = true" og "30 dages varsel"
        DPA dpa = dpaBuilder.withWrittenApproval(true).build();

        // 1. Tjek at navnet er korrekt (Strategy)
        assertEquals("NeedWrittenApproval", dpa.getCommunicationStrats().getFirst().getStrategy());

        // 2. Tjek at dagene er kommet med som attribut (Attributes)
        assertEquals(dpa.getCustomerName(), dpa.getCommunicationStrats().getFirst().getAttributes().get("email"));
    }

    @Test
    void withEmailNoticeTest() {
        // Simulerer "NeedWrittenApproval = false", hvilket skal give "NeedEmailNotice".

        DPA dpa = dpaBuilder.withEmailNotice(60).build();

        // 1. Tjek at strategien nu hedder NeedEmailNotice
        assertEquals("NeedEmailNotice", dpa.getCommunicationStrats().getFirst().getStrategy());

        // 2. Tjek attributterne
        Map<String, Object> attributes = dpa.getCommunicationStrats().getFirst().getAttributes();
        assertEquals(60, attributes.get("daysOfNotice"));
        assertEquals("customer", attributes.get("email")); // Tjekker at email-fallback virker
    }

    @Test
    void withLocationsRequirementTest() {
        List<String> allowedLocations = List.of("EU");

        DPA dpa = dpaBuilder.withLocationRequirement(allowedLocations).build();

        assertEquals("ProcessingLocationEvaluator", dpa.getRequirements().getFirst().getReqEvaluator());
        assertEquals(allowedLocations, dpa.getRequirements().getFirst().getAttributes().get("allowedLocations"));
    }
}