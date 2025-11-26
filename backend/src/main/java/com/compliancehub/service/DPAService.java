package com.compliancehub.service;


import com.compliancehub.model.DPA;
import com.compliancehub.model.Requirement;
import com.compliancehub.strategy.RequirementsEvaluator.ProcessingLocationEvaluator;
import com.compliancehub.strategy.RequirementsEvaluator.RequirementsEvaluator;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DPAService {


    private RequirementsEvaluator getReqEvalutorFromString(Requirement requirement) {

        switch (requirement.getReqEvaluator()) {
            case "ProcessingLocationsEvaluator": return new ProcessingLocationEvaluator(requirement.getAttributes());
            // todo: Add more Evaluators
            default: throw new RuntimeException("Error getting evaluator "+requirement.getReqEvaluator());
        }
    }

}
