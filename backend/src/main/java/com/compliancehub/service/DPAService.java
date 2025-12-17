package com.compliancehub.service;

import com.compliancehub.dto.ActionDTO;
import com.compliancehub.dto.DPA_DTO;
import com.compliancehub.dto.ViolationDTO;
import com.compliancehub.model.*;

import com.compliancehub.repository.DPARepository;
import com.compliancehub.repository.DataProcessorRepository;

import com.compliancehub.service.builder.DPABuilder;
import com.compliancehub.strategy.CommunicationStrategy.ICommunicationStrategy;
import com.compliancehub.strategy.RequirementsEvaluator.IRequirementsEvaluator;
import com.compliancehub.strategy.factory.CommunicationStrategyFactory;
import com.compliancehub.strategy.factory.EvaluatorFactory;

import jakarta.persistence.EntityNotFoundException;

import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class DPAService {
    private final DPARepository repository;
    private final EvaluatorFactory evaluatorFactory;
    private final CommunicationStrategyFactory strategyFactory;
    private final DataProcessorRepository dataProcessorRepository;

    public DPAService(DPARepository repository, DataProcessorRepository dataProcessorRepository, EvaluatorFactory evaluatorFactory, CommunicationStrategyFactory strategyFactory){
        this.repository = repository;
        this.dataProcessorRepository = dataProcessorRepository;
        this.evaluatorFactory = evaluatorFactory;
        this.strategyFactory = strategyFactory;
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
        //1: byg en DPA vha. builder pattern
        DPA dpa = new DPABuilder(req.customerName(), req.productName(), req.fileUrl())
                .withWrittenApproval(req.needWrittenApproval())
                .withNoticePeriod(req.daysOfNotice())
                .withLocationRequirement(req.allowedProcessingLocations())
                .build();

        //2: gem DPA'en
        DPA savedDPA = repository.save(dpa);

        //3: Tjek for violations
        //tjekker alle DPA's reqs mod alle eksisterende DP'er
        List<DataProcessor> processors = dataProcessorRepository.findAll();
        for (DataProcessor dp : processors) {
            this.evaluateAllRequirements(dpa, dp);
        }

        //4: returnér ny DPA
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


    public void evaluateAllRequirements(DPA dpa, DataProcessor dataProcessor) {
        for (Requirement req : dpa.getRequirements()) {
            IRequirementsEvaluator evaluator = evaluatorFactory.create(
                    req.getReqEvaluator(),
                    req.getAttributes()
            );

            evaluator.evaluate(dpa, dataProcessor); // will also create violations and append to DPA;
        }

        // creates actions for each violation
        for (Violation violation : dpa.getViolations()) {
            for (CommunicationStrategy strat : dpa.getCommunicationStrats()) {
                ICommunicationStrategy strategy = strategyFactory.create(strat.getStrategy(), strat.getAttributes());
                violation.addAction(strategy.createAction(dpa));
            }
        }

        repository.save(dpa);
    }

}
