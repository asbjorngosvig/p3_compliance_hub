package com.compliancehub.service;


import com.compliancehub.dto.DPADTO;
import com.compliancehub.model.DPA;
import com.compliancehub.model.DataProcessor;
import com.compliancehub.model.Requirement;
import com.compliancehub.repository.DPARepository;
import com.compliancehub.strategy.RequirementsEvaluator.ProcessingLocationEvaluator;
import com.compliancehub.strategy.RequirementsEvaluator.RequirementsEvaluator;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DPAService {
    DPARepository dpaRepository;

    public DPADTO.GetAllResponse getAll() {
        List<DPA> allDPA = dpaRepository.findAll();

        List<DPADTO.DPAResponse> dpaResonses = allDPA.stream().map(dpa->
             new DPADTO.DPAResponse(dpa.getDPAId(), dpa.getViolations(), dpa.getCustomerName(), dpa.getProductName())
        ).toList();

        return new DPADTO.GetAllResponse(dpaResonses, (long) allDPA.size(), "Date created", "Ascending");
    }

    public RequirementsEvaluator getReqEvaluator(Requirement requirement) {
        switch (requirement.getReqEvaluator()) {
            case "ProcessingLocationsEvaluator": return new ProcessingLocationEvaluator(requirement.getAttributes());
            // todo: Add more Evaluators
            default: throw new RuntimeException("Error getting requirement evaluator "+requirement.getReqEvaluator());
        }
    }

    public void evaluateAllRequirements(DPA dpa, DataProcessor dataProcessor) {
        for (Requirement req : dpa.getRequirements()) {
            RequirementsEvaluator evaluator = getReqEvaluator(req);
            evaluator.evaluate(dpa, dataProcessor); // will also create violations and append to DPA;
        }
    }

}
