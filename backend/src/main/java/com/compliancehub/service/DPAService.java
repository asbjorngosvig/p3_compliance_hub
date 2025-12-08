package com.compliancehub.service;

import com.compliancehub.dto.DPA_DTO;
import com.compliancehub.model.*;
import com.compliancehub.model.CommunicationStrategy;
import com.compliancehub.repository.DPARepository;

import com.compliancehub.strategy.CommunicationStrategy.*;
import com.compliancehub.strategy.RequirementsEvaluator.ProcessingLocationEvaluator;
import com.compliancehub.strategy.RequirementsEvaluator.RequirementsEvaluator;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;

import java.util.Map;
import java.util.UUID;

@Service
public class DPAService {
    private final DPARepository repository;
    private final DataProcessorService dataProcessorService;

    public DPAService(DPARepository repository, DataProcessorService dataProcessorService){
        this.repository = repository;
        this.dataProcessorService = dataProcessorService;
    }

    public DPA_DTO.CreateResponse create(DPA_DTO.CreateRequest req){
        DPA newDPA = new DPA();
        newDPA.setCustomerName(req.customerName());
        newDPA.setProductName(req.productName());
        newDPA.setFileUrl(req.fileUrl());

        if (req.needWrittenAprooval()) {
            CommunicationStrategy strat = new CommunicationStrategy();
            strat.setDpa(newDPA);
            strat.setStrategy("NeedWrittenAprooval"); // Navnet på strategi class
            newDPA.addCommunicationStrategy(strat);
        }

        // Adds the period of notice strategy
        CommunicationStrategy strat = new CommunicationStrategy();
        strat.setDpa(newDPA);

        // todo: find en måde at bruge email istedet for navn her...
        Map<String, Object> attributes = new HashMap<>();

        attributes.put("email", req.customerName());
        strat.setAttributes(attributes);

        strat.setStrategy("DaysOfNotice"); // Navnet på strategi class
        newDPA.addCommunicationStrategy(strat);


        /* set the processing locations requirement fields */
        Requirement requirement1 = new Requirement();

        // Important: SKAL STÅ "allowedLocations"
        attributes = new HashMap<>();
        attributes.put("allowedLocations", req.allowedProcessingLocations());
        requirement1.setReqEvaluator("ProcessingLocationEvaluator"); // Navnet på evaluator class
        requirement1.setDpa(newDPA);

        newDPA.addRequirement(requirement1);

        for (DataProcessor dp : dataProcessorService.getAllEntities()) {
            evaluateAllRequirements(newDPA, dp);
        }

        // todo: logic for parsing requirements
        // todo: logic for parsing communication strategies

        // todo: logic for generating actions and violations

        DPA savedDPA = repository.save(newDPA);

        return new DPA_DTO.CreateResponse(
            new DPA_DTO.StandardDPAResponse(
                savedDPA.getId(),
                savedDPA.getViolations(),
                savedDPA.getCustomerName(),
                savedDPA.getProductName(),
                savedDPA.getCreatedDate(),
                savedDPA.getFileUrl()
            )
        );
    }




    public DPA_DTO.GetAllResponse getAll() {
        List<DPA> allDPAs = repository.findAll();

        List<DPA_DTO.StandardDPAResponse> dpaResponses = allDPAs.stream()
                .map(dpa -> new DPA_DTO.StandardDPAResponse(
                        dpa.getId(),
                        dpa.getViolations(),
                        dpa.getRequirements(),
                        dpa.getCommunicationStrats(),
                        dpa.getCustomerName(),
                        dpa.getProductName(),
                        dpa.getCreatedDate(),
                        dpa.getFileUrl()
                ))
                .toList();

        return new DPA_DTO.GetAllResponse(dpaResponses, (long) allDPAs.size());
    }
    public void delete(UUID id) {
        repository.deleteById(id);
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
