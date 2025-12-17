package com.compliancehub.compliance_engine.service;

import com.compliancehub.compliance_engine.model.CommunicationStrategy;

import com.compliancehub.compliance_engine.model.Violation;
import com.compliancehub.compliance_engine.service.factory.CommunicationStrategyFactory;
import com.compliancehub.compliance_engine.service.factory.ComplianceCheckerFactory;

import com.compliancehub.compliance_engine.strategy.CommunicationActionGenerator.NeedEmailNotice;
import com.compliancehub.compliance_engine.strategy.RequirementsComplianceChecker.ProcessingLocationComplianceChecker;
import com.compliancehub.data_processor_manager.DataProcessor;
import com.compliancehub.data_processor_manager.DataProcessorRepository;
import com.compliancehub.dpa_manager.DPA;
import com.compliancehub.dpa_manager.DPARepository;
import com.compliancehub.dpa_manager.Requirement;
import com.compliancehub.mockClasses.MockDPA;
import com.compliancehub.mockClasses.MockDataProcessor;
import com.compliancehub.mockClasses.MockProcessingLocationsRequirement;

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

@ExtendWith(MockitoExtension.class)
class ComplianceServiceTest {

    @Mock
    private ComplianceCheckerFactory complianceCheckerFactory;

    @Mock
    private CommunicationStrategyFactory communicationStrategyFactory;

    @Mock
    private DataProcessorRepository dataProcessorRepository;

    @Mock
    private DPARepository dpaRepository;

    @InjectMocks
    private ComplianceService complianceService;


    @Test
    void performComplianceCheckDPA_ViolationsNotGenerated() {
        DPA dpa = MockDPA.getMock();
        DataProcessor dataProcessor = MockDataProcessor.getMock();

        Requirement req = MockProcessingLocationsRequirement.getMockWithValidLocations(dpa);
        dpa.addRequirement(req);

        when(dataProcessorRepository.findAll()).thenReturn(List.of(dataProcessor));
        when(complianceCheckerFactory.create(any(), any())).thenReturn(new ProcessingLocationComplianceChecker(req.getAttributes()));

        Map<String, Object> attributes = new HashMap<>();
        attributes.put("email", "test@mail.com");
        attributes.put("daysOfNotice", 30);
        CommunicationStrategy communicationStrategy = new CommunicationStrategy();
        communicationStrategy.setAttributes(attributes);
        communicationStrategy.setStrategy("NeedEmailNotice");

        // sørger for at DataProcessor har præcis samme locations som processing locations som requirement
        List<String> allowedLocations = (List<String>) req.getAttributes().get("allowedLocations");
        dataProcessor.setProcessingLocations(allowedLocations);

        complianceService.performComplianceCheckDPA(dpa);

        assertTrue(dpa.getViolations().isEmpty());
    }

    @Test
    void performComplianceCheckDPA_ViolationsGenerated() {
            DPA dpa = MockDPA.getMock();
            DataProcessor dataProcessor = MockDataProcessor.getMock();

            Requirement req = MockProcessingLocationsRequirement.getMockWithInvalidLocations(dpa);

            dpa.setRequirements(List.of(req));

            when(dataProcessorRepository.findAll()).thenReturn(List.of(dataProcessor));
            when(complianceCheckerFactory.create(any(), any())).thenReturn(new ProcessingLocationComplianceChecker(req.getAttributes()));

            Map<String, Object> attributes = new HashMap<>();
            attributes.put("email", "test@mail.com");
            attributes.put("daysOfNotice", 30);
            CommunicationStrategy communicationStrategy = new CommunicationStrategy();
            communicationStrategy.setAttributes(attributes);
            communicationStrategy.setStrategy("NeedEmailNotice");

            dpa.addCommunicationStrategy(communicationStrategy);

            when(communicationStrategyFactory.create(any(), any())).thenReturn(new NeedEmailNotice(attributes));


            List<String> allowedLocations = List.of("EU");
            dataProcessor.setProcessingLocations(allowedLocations);

            complianceService.performComplianceCheckDPA(dpa);

            // make sure violations are generated
            assertFalse(dpa.getViolations().isEmpty());

            // Make sure actions are generated for each violation
            for (Violation violation : dpa.getViolations()) {
                assertFalse(violation.getActions().isEmpty());
            }
    }

    @Test
    void performComplianceCheckDP_ViolationsNotGenerated() {
        DPA dpa = MockDPA.getMock();
        DataProcessor dataProcessor = MockDataProcessor.getMock();

        Requirement req = MockProcessingLocationsRequirement.getMockWithValidLocations(dpa);
        dpa.addRequirement(req);

        when(dpaRepository.findAll()).thenReturn(List.of(dpa));
        when(complianceCheckerFactory.create(any(), any())).thenReturn(new ProcessingLocationComplianceChecker(req.getAttributes()));

        Map<String, Object> attributes = new HashMap<>();
        attributes.put("email", "test@mail.com");
        attributes.put("daysOfNotice", 30);
        CommunicationStrategy communicationStrategy = new CommunicationStrategy();
        communicationStrategy.setAttributes(attributes);
        communicationStrategy.setStrategy("NeedEmailNotice");

        // sørger for at DataProcessor har præcis samme locations som processing locations som requirement
        List<String> allowedLocations = (List<String>) req.getAttributes().get("allowedLocations");
        dataProcessor.setProcessingLocations(allowedLocations);

        complianceService.performComplianceCheckDP(dataProcessor);

        assertTrue(dpa.getViolations().isEmpty());
    }

    @Test
    void performComplianceCheckDP_ViolationsGenerated() {
        DPA dpa = MockDPA.getMock();
        DataProcessor dataProcessor = MockDataProcessor.getMock();

        Requirement req = MockProcessingLocationsRequirement.getMockWithInvalidLocations(dpa);

        dpa.setRequirements(List.of(req));

        when(dpaRepository.findAll()).thenReturn(List.of(dpa));
        when(complianceCheckerFactory.create(any(), any())).thenReturn(new ProcessingLocationComplianceChecker(req.getAttributes()));

        Map<String, Object> attributes = new HashMap<>();
        attributes.put("email", "test@mail.com");
        attributes.put("daysOfNotice", 30);
        CommunicationStrategy communicationStrategy = new CommunicationStrategy();
        communicationStrategy.setAttributes(attributes);
        communicationStrategy.setStrategy("NeedEmailNotice");

        dpa.addCommunicationStrategy(communicationStrategy);

        when(communicationStrategyFactory.create(any(), any())).thenReturn(new NeedEmailNotice(attributes));


        List<String> allowedLocations = List.of("EU");
        dataProcessor.setProcessingLocations(allowedLocations);

        complianceService.performComplianceCheckDP(dataProcessor);

        // make sure violations are generated
        assertFalse(dpa.getViolations().isEmpty());

        // Make sure actions are generated for each violation
        for (Violation violation : dpa.getViolations()) {
            assertFalse(violation.getActions().isEmpty());
        }
    }
}