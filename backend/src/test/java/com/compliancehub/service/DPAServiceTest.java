package com.compliancehub.service;
import com.compliancehub.mockClasses.MockDPA;
import com.compliancehub.mockClasses.MockDataProcessor;
import com.compliancehub.mockClasses.MockProcessingLocationsRequirement;
import com.compliancehub.model.DPA;
import com.compliancehub.model.DataProcessor;
import com.compliancehub.model.Requirement;
import com.compliancehub.model.Violation;
import com.compliancehub.repository.DPARepository;
import com.compliancehub.repository.DataProcessorRepository;

import com.compliancehub.strategy.CommunicationStrategy.NeedEmailNotice;
import com.compliancehub.strategy.RequirementsEvaluator.ProcessingLocationEvaluator;
import com.compliancehub.strategy.factory.CommunicationStrategyFactory;
import com.compliancehub.strategy.factory.EvaluatorFactory;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;


//fra jUnit5. init mocks så det ik skal gøres længere nede
@ExtendWith(MockitoExtension.class)
class DPAServiceTest {

    @Mock
    private DPARepository dpaRepository;

    @Mock
    private EvaluatorFactory evaluatorFactory = new EvaluatorFactory();

    @Mock
    private CommunicationStrategyFactory strategyFactory = new CommunicationStrategyFactory();

    @Mock
    private DataProcessorRepository dataProcessorRepository;

    @InjectMocks
    private DPAService dpaService;


    // sørger for at der rent faktisk bliver oprettet maks èn violation pr requirement
    @Test
    void evaluateAllRequirementsTest_violationsGenerated() {
        DPA dpa = MockDPA.getMock();
        DataProcessor dataProcessor = MockDataProcessor.getMock();

        Requirement req = MockProcessingLocationsRequirement.getMockWithValidLocations(dpa);

        dpa.setRequirements(List.of(req));

        when(evaluatorFactory.create(any(), any())).thenReturn(new ProcessingLocationEvaluator(req.getAttributes()));

        Map<String, Object> attributes = new HashMap<>();
        attributes.put("daysOfNotice", 30);
        attributes.put("email", "test@mail.com");

        when(strategyFactory.create(any(), any())).thenReturn(new NeedEmailNotice(attributes));

        dpaService.evaluateAllRequirements(dpa, dataProcessor);

        // sørger for at der er genereret violation efter evaluering
        assertFalse(dpa.getViolations().isEmpty());

        // sørger for at der er genereret max 1 violation pr requirement
        assertTrue(dpa.getViolations().size() <= dpa.getRequirements().size());

        for (Violation violation : dpa.getViolations()) {
            assertEquals(1,violation.getActions().size());
        }
    }

    // sørger for at der IKKE bliver oprettet en violation hvis der ikke er fejl
    @Test
    void evaluateAllRequirementsTest_violationsNotGenerated() {
        DPA dpa = MockDPA.getMock();
        DataProcessor dataProcessor = MockDataProcessor.getMock();

        Requirement req = MockProcessingLocationsRequirement.getMockWithInvalidLocations(dpa);

        dpa.setRequirements(List.of(req));

        when(evaluatorFactory.create(any(), any())).thenReturn(new ProcessingLocationEvaluator(req.getAttributes()));

        List<String> allowedLocations = (List<String>) req.getAttributes().get("allowedLocations");

        // sørger for at DataProcessor har præcis samme locations som processing locations som requirement
        dataProcessor.setProcessingLocations(allowedLocations);

        dpaService.evaluateAllRequirements(dpa, dataProcessor);

        // sørger for at der ikke er genereret violation efter evaluering
        assertTrue(dpa.getViolations().isEmpty());

    }




}