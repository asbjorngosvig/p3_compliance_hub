package com.compliancehub.compliance_engine.service.factory;

import com.compliancehub.compliance_engine.strategy.RequirementsEvaluator.IRequirementsEvaluator;
import com.compliancehub.compliance_engine.strategy.RequirementsEvaluator.ProcessingLocationEvaluator;
import org.springframework.stereotype.Component;

import java.util.InputMismatchException;
import java.util.Map;

@Component
public class EvaluatorFactory {
    public IRequirementsEvaluator create(String evaluator, Map<String, Object> attributes){
        switch (evaluator) {
            case "ProcessingLocationEvaluator": return new ProcessingLocationEvaluator(attributes);

            //  Add more Evaluators

            default: throw new InputMismatchException("Error getting requirement evaluator "+evaluator);
        }
    }
}