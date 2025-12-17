package com.compliancehub.compliance_engine.service;

import com.compliancehub.compliance_engine.model.CommunicationStrategy;
import com.compliancehub.compliance_engine.model.Violation;
import com.compliancehub.compliance_engine.service.factory.CommunicationStrategyFactory;
import com.compliancehub.compliance_engine.service.factory.ComplianceCheckerFactory;
import com.compliancehub.compliance_engine.strategy.CommunicationActionGenerator.ICommunicationStrategy;
import com.compliancehub.compliance_engine.strategy.RequirementsComplianceChecker.IRequirementsComplianceChecker;
import com.compliancehub.data_processor_manager.DataProcessor;
import com.compliancehub.dpa_manager.DPA;
import com.compliancehub.dpa_manager.Requirement;
import org.springframework.stereotype.Service;

@Service
public class ComplianceService {
    private final ComplianceCheckerFactory complianceCheckerFactory;
    private final CommunicationStrategyFactory communicationStrategyFactory;

    public ComplianceService(ComplianceCheckerFactory evalFac, CommunicationStrategyFactory commStratFac) {
        this.complianceCheckerFactory = evalFac;
        this.communicationStrategyFactory = commStratFac;
    }

    public void performComplianceCheck(DPA dpa, DataProcessor dataProcessor){
        detectRequirementViolations(dpa, dataProcessor);
        generateViolationActions(dpa);
    }

    private void detectRequirementViolations(DPA dpa, DataProcessor dataProcessor) {
        for (Requirement req : dpa.getRequirements()) {
            IRequirementsComplianceChecker checker = complianceCheckerFactory.create(
                //reqEvaluator is old naming. not refactored throughout yet
                req.getReqEvaluator(),
                req.getAttributes()
            );

            // evaluating compliance and adding violations to DPA
            checker.detectViolations(dpa, dataProcessor);
        }
    }

    private void generateViolationActions(DPA dpa){
        for (Violation violation : dpa.getViolations()) {
            for (CommunicationStrategy strat : dpa.getCommunicationStrats()) {
                ICommunicationStrategy strategy = communicationStrategyFactory.create(
                        strat.getStrategy(),
                        strat.getAttributes()
                );

                //based on preferred comm strat, create violation for the action
                violation.addAction(strategy.createAction(dpa));
            }
        }
    }
}
