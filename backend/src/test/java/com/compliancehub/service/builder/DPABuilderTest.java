package com.compliancehub.service.builder;


import com.compliancehub.dpa_manager.DPA;

import com.compliancehub.dpa_manager.builder.DPABuilder;
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


        assertEquals("NeedWrittenApproval", dpa.getCommunicationStrats().getFirst().getStrategy());
    }

    @Test
    void withNoticePeriodTest() {

        DPA dpa = dpaBuilder.withNoticePeriod(30).build();


        assertEquals("DaysOfNotice", dpa.getCommunicationStrats().getFirst().getStrategy());
        assertEquals(30, dpa.getCommunicationStrats().getFirst().getAttributes().get("daysOfNotice"));
        assertEquals(dpa.getCustomerName(), dpa.getCommunicationStrats().getFirst().getAttributes().get("email"));
    }


    @Test
    void withLocationsRequirementTest() {
        List<String> allowedLocations = List.of("EU");

        DPA dpa = dpaBuilder.withLocationRequirement(allowedLocations).build();

        assertEquals("ProcessingLocationEvaluator", dpa.getRequirements().getFirst().getReqEvaluator());

        assertEquals(allowedLocations, dpa.getRequirements().getFirst().getAttributes().get("allowedLocations"));
    }


}
