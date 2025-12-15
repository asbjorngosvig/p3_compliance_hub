package com.compliancehub.service.builder;


import com.compliancehub.model.DPA;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

public class DPABuilderTest {

    public DPABuilder dpaBuilder;

    @BeforeEach
    void setUp() {
        dpaBuilder = new DPABuilder("customer", "product", "https://url.com");
    }

    @Test
    void withWrittenAproovalTest() {

        DPA dpa = dpaBuilder.withWrittenApproval(true).build();


        assertTrue(dpa.getCommunicationStrats().getFirst().getStrategy().equals("NeedWrittenApproval"));
    }

    @Test
    void withNoticePeriodTest() {

        DPA dpa = dpaBuilder.withNoticePeriod(30).build();


        assertTrue(dpa.getCommunicationStrats().getFirst().getStrategy().equals("DaysOfNotice"));
        assertEquals(30, dpa.getCommunicationStrats().getFirst().getAttributes().get("daysOfNotice"));
        assertEquals(dpa.getCustomerName(), dpa.getCommunicationStrats().getFirst().getAttributes().get("email"));
    }


    @Test
    void withLocationsRequirementTest() {
        List<String> allowedLocations = List.of("EU");

        DPA dpa = dpaBuilder.withLocationRequirement(allowedLocations).build();

        assertTrue(dpa.getRequirements().getFirst().getReqEvaluator().equals("ProcessingLocationEvaluator"));

        assertEquals(allowedLocations, dpa.getRequirements().getFirst().getAttributes().get("allowedLocations"));
    }


}
