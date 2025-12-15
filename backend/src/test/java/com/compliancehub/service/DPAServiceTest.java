package com.compliancehub.service;
import com.compliancehub.mockClasses.MockDPA;
import com.compliancehub.mockClasses.MockDataProcessor;
import com.compliancehub.mockClasses.MockProcessingLocationsRequirement;
import com.compliancehub.model.DPA;
import com.compliancehub.model.DataProcessor;
import com.compliancehub.model.Requirement;
import com.compliancehub.repository.DPARepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;


import static org.junit.jupiter.api.Assertions.*;


//fra jUnit5. init mocks så det ik skal gøres længere nede
@ExtendWith(MockitoExtension.class)
class DPAServiceTest {

    @Mock
    private DPARepository dpaRepository;

    @InjectMocks
    private DPAService dpaService;


    // sørger for at der rent faktisk bliver oprettet maks èn violation pr requirement
    @Test
    void evaluateAllRequirementsTest_violationsGenerated() {
        DPA dpa = MockDPA.getMock();
        DataProcessor dataProcessor = MockDataProcessor.getMock();

        Requirement requirement = MockProcessingLocationsRequirement.getMockWithValidLocations(dpa);

        dpa.setRequirements(List.of(requirement));

        dpaService.evaluateAllRequirements(dpa, dataProcessor);

        // sørger for at der er genereret violation efter evaluering
        assertFalse(dpa.getViolations().isEmpty());

        // sørger for at der er genereret max 1 violation pr requirement
        assertTrue(dpa.getViolations().size() <= dpa.getRequirements().size());
    }

    // sørger for at der IKKE bliver oprettet en violation hvis der ikke er fejl
    @Test
    void evaluateAllRequirementsTest_violationsNotGenerated() {
        DPA dpa = MockDPA.getMock();
        DataProcessor dataProcessor = MockDataProcessor.getMock();

        Requirement requirement = MockProcessingLocationsRequirement.getMockWithInvalidLocations(dpa);

        dpa.setRequirements(List.of(requirement));

        // sørger for at DataProcessor har præcis samme locations som processing locations som requirement
        dataProcessor.setProcessingLocations((List<String>) requirement.getAttributes().get("allowedLocations"));

        dpaService.evaluateAllRequirements(dpa, dataProcessor);

        // sørger for at der ikke er genereret violation efter evaluering
        assertTrue(dpa.getViolations().isEmpty());

    }




}

