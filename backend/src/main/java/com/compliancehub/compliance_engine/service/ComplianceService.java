package com.compliancehub.compliance_engine.service;

import com.compliancehub.compliance_engine.model.CommunicationStrategy;
import com.compliancehub.compliance_engine.model.Violation;
import com.compliancehub.compliance_engine.service.factory.CommunicationStrategyFactory;
import com.compliancehub.compliance_engine.service.factory.ComplianceCheckerFactory;
import com.compliancehub.compliance_engine.strategy.CommunicationActionStrategy.IActionStrategy;
import com.compliancehub.compliance_engine.strategy.RequirementsComplianceChecker.IRequirementsComplianceChecker;
import com.compliancehub.data_processor_manager.DataProcessor;
import com.compliancehub.data_processor_manager.DataProcessorRepository;
import com.compliancehub.dpa_manager.DPA;
import com.compliancehub.dpa_manager.DPARepository;
import com.compliancehub.dpa_manager.Requirement;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ComplianceService {
    private final ComplianceCheckerFactory checkerFactory;
    private final CommunicationStrategyFactory actionFactory;
    private final DataProcessorRepository dataProcessorRepository;
    private final DPARepository dpaRepository;

    public ComplianceService(ComplianceCheckerFactory evalFac, CommunicationStrategyFactory commStratFac, DataProcessorRepository dpRepository, DPARepository dpaRepository) {
        this.checkerFactory = evalFac;
        this.actionFactory = commStratFac;
        this.dataProcessorRepository = dpRepository;
        this.dpaRepository = dpaRepository;
    }
    // Scenario 1: DPA oprettelse (Ingen save nødvendig her, klares i DPAService)
    public void performComplianceCheckDPA(DPA dpa) {
        List<DataProcessor> DPs = dataProcessorRepository.findAll();

        // 1. Find violations
        for (DataProcessor dp : DPs) {
            detectRequirementViolations(dpa, dp);
        }

        // 2. Generer actions (kun for de nye violations)
        generateViolationActions(dpa);
    }

    // Scenario 2: DP oprettelse
    // Ved hver violation der bliver fundet bliver det koblet til DPA, og ikke DP.
    // Dvs de bliver aldrig gemt medmindre vi kalder save
    public void performComplianceCheckDP(DataProcessor dp){
        List<DPA> DPAs = dpaRepository.findAll();

        for (DPA dpa : DPAs) {
            detectRequirementViolations(dpa, dp);
            generateViolationActions(dpa);
            dpaRepository.save(dpa);
        }
    }

    private void detectRequirementViolations(DPA dpa, DataProcessor dp) {
        for (Requirement req : dpa.getRequirements()) {
            IRequirementsComplianceChecker checker = checkerFactory.create(
                req.getReqEvaluator(),
                req.getAttributes()
            );

            // evaluating compliance and adding violations to DPA
            checker.detectViolations(dpa, dp);
        }
    }

    private void generateViolationActions(DPA dpa){
        for (Violation violation : dpa.getViolations()) {

            //tjekker om violations har actions. hvis ja, så er den allerede "håndteret"
            if (!violation.getActions().isEmpty()) continue;

            for (CommunicationStrategy config : dpa.getCommunicationStrats()) {
                IActionStrategy strategy = actionFactory.create(
                    config.getStrategy(), //eks "EMAIL_NOTICE"
                    config.getAttributes()
                );

                //based on preferred comm strat, create violation for the action
                violation.addAction(strategy.createAction(dpa));
            }
        }
    }
}