package com.compliancehub.compliance_engine.service.factory;

import com.compliancehub.compliance_engine.strategy.RequirementsComplianceChecker.IRequirementsComplianceChecker;
import com.compliancehub.compliance_engine.strategy.RequirementsComplianceChecker.ProcessingLocationComplianceChecker;
import org.springframework.stereotype.Component;

import java.util.InputMismatchException;
import java.util.Map;

@Component
public class ComplianceCheckerFactory {
    public IRequirementsComplianceChecker create(String checker, Map<String, Object> attributes){
        switch (checker) {
            case "ProcessingLocationEvaluator": return new ProcessingLocationComplianceChecker(attributes);

            //  Add more Evaluators

            default: throw new InputMismatchException("Error getting requirement compliance checker "+ checker);
        }
    }
}