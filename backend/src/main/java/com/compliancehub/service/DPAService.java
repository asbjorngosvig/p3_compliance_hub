package com.compliancehub.service;

import com.compliancehub.dto.DPA_DTO;
import com.compliancehub.model.*;
import com.compliancehub.repository.DPARepository;
import com.compliancehub.strategy.RequirementsEvaluator.ProcessingLocationEvaluator;
import com.compliancehub.strategy.RequirementsEvaluator.RequirementsEvaluator;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.UUID;

@Service
public class DPAService {
    private final DPARepository repository;

    public DPAService(DPARepository repository){
        this.repository = repository;
    }

    public DPA_DTO.CreateResponse create(DPA_DTO.CreateRequest req){
        DPA newDPA = new DPA();
        newDPA.setCustomerName(req.customerName());
        newDPA.setProductName(req.productName());
        newDPA.setFileUrl(req.fileUrl());

        if (req.requirements() != null) {
            for (Requirement r : req.requirements()) {
                newDPA.addRequirement(r);
            }
        }

        if (req.communicationStrategies() != null) {
            for (CommunicationStrategy s : req.communicationStrategies()) {
                newDPA.addCommunicationStrategy(s);
            }
        }

        DPA savedDPA = repository.save(newDPA);

        return new DPA_DTO.CreateResponse(
            new DPA_DTO.StandardDPAResponse(
                savedDPA.getId(),
                savedDPA.getViolations(),
                savedDPA.getRequirements(),
                savedDPA.getCommunicationStrats(),
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
