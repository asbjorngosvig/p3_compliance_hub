package com.compliancehub.service;

import com.compliancehub.dto.ActionDTO;
import com.compliancehub.dto.DPA_DTO;
import com.compliancehub.dto.ViolationDTO;
import com.compliancehub.model.*;
import com.compliancehub.model.CommunicationStrategy;
import com.compliancehub.repository.DPARepository;

import com.compliancehub.repository.DataProcessorRepository;
import com.compliancehub.strategy.RequirementsEvaluator.ProcessingLocationEvaluator;
import com.compliancehub.strategy.RequirementsEvaluator.IRequirementsEvaluator;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.dao.DataRetrievalFailureException;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class DPAService {
    private final DPARepository repository;
    private final DataProcessorRepository dataProcessorRepository;

    public DPAService(DPARepository repository, DataProcessorRepository dataProcessorRepository){
        this.repository = repository;
        this.dataProcessorRepository = dataProcessorRepository;
    }

    public DPA_DTO.StandardDPAResponse getById(UUID id) {
        DPA dpa = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("DPA not found with id: " + id));

        return new DPA_DTO.StandardDPAResponse(
                dpa.getId(),
                createViolationDTOFromDPA(dpa),
                dpa.getCustomerName(),
                dpa.getProductName(),
                dpa.getCreatedDate(),
                dpa.getFileUrl()
        );
    }

    public DPA_DTO.CreateResponse create(DPA_DTO.CreateRequest req){
        DPA newDPA = new DPA();
        newDPA.setCustomerName(req.customerName());
        newDPA.setProductName(req.productName());
        newDPA.setFileUrl(req.fileUrl());

        // adds the need written aprooval strategy
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
        attributes = new HashMap<>(); // Important: SKAL STÅ "allowedLocations"
        attributes.put("allowedLocations", req.allowedProcessingLocations());
        requirement1.setAttributes(attributes);
        requirement1.setReqEvaluator("ProcessingLocationEvaluator"); // Navnet på evaluator class
        requirement1.setDpa(newDPA);
        newDPA.addRequirement(requirement1);


        List<DataProcessor> dataProcessorList;

        dataProcessorList = dataProcessorRepository.findAll();

        for (DataProcessor dp : dataProcessorList) {
            evaluateAllRequirements(newDPA, dp);
        }

        DPA savedDPA;
        savedDPA = repository.save(newDPA);

        return new DPA_DTO.CreateResponse(
            new DPA_DTO.StandardDPAResponse(
                savedDPA.getId(),
                createViolationDTOFromDPA(savedDPA),
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
                .map(dpa ->

                        new DPA_DTO.StandardDPAResponse(
                        dpa.getId(), createViolationDTOFromDPA(dpa),
                        dpa.getCustomerName(),
                        dpa.getProductName(),
                        dpa.getCreatedDate(),
                        dpa.getFileUrl()
                ))
                .toList();

        return new DPA_DTO.GetAllResponse(dpaResponses, allDPAs.size());
    }

    public List<DPA> getAllEntities() {
        return repository.findAll();
    }

    private List<ViolationDTO.standardResponse> createViolationDTOFromDPA(DPA dpa) {
        List<ViolationDTO.standardResponse> violationDTOs = new ArrayList<>();

        for (Violation violation : dpa.getViolations()) {
            List<ActionDTO.standardResponse> actionDTO = new ArrayList<>();

            for (Action action : violation.getActions()) {
                actionDTO.add(new ActionDTO.standardResponse(action.getDescription(), action.getActionId()));
            }
            violationDTOs.add(new ViolationDTO.standardResponse(violation.getDescription(),violation.getViolationId(),actionDTO));
        }

        return violationDTOs;
    }

    public void delete(UUID id) {
        repository.deleteById(id);
    }


    public IRequirementsEvaluator getReqEvaluator(Requirement requirement) {
        switch (requirement.getReqEvaluator()) {
            case "ProcessingLocationEvaluator": return new ProcessingLocationEvaluator(requirement.getAttributes());

            //  Add more Evaluators

            default: throw new InputMismatchException("Error getting requirement evaluator "+requirement.getReqEvaluator());
        }
    }

    public void evaluateAllRequirements(DPA dpa, DataProcessor dataProcessor) {
        for (Requirement req : dpa.getRequirements()) {
            IRequirementsEvaluator evaluator = getReqEvaluator(req);
            evaluator.evaluate(dpa, dataProcessor); // will also create violations and append to DPA;
        }
        repository.save(dpa);
    }

}
