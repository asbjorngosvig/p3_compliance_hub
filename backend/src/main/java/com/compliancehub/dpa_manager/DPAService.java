package com.compliancehub.dpa_manager;

import com.compliancehub.compliance_engine.model.Action;
import com.compliancehub.compliance_engine.model.Violation;
import com.compliancehub.compliance_engine.service.ComplianceService;
import com.compliancehub.compliance_engine.dto.ActionDTO;
import com.compliancehub.compliance_engine.dto.ViolationDTO;
import com.compliancehub.dpa_manager.builder.DPABuilder;

import jakarta.persistence.EntityNotFoundException;

import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class DPAService {
    private final DPARepository repository;
    private final ComplianceService complianceService;

    public DPAService(DPARepository repository, ComplianceService complianceService){
        this.repository = repository;
        this.complianceService = complianceService;
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

        //2: Tjek for violations
        //compliance check (alle DPA's reqs mod alle eksisterende DP'er) + violation and action creation
        complianceService.performComplianceCheckDPA(dpa);

        //3: gemmer i databasen
        repository.save(dpa);

        //4: returnér ny DPA
        return new DPA_DTO.CreateResponse(
            new DPA_DTO.StandardDPAResponse(
                dpa.getId(),
                createViolationDTOFromDPA(dpa),
                dpa.getCustomerName(),
                dpa.getProductName(),
                dpa.getCreatedDate(),
                dpa.getFileUrl()
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
}
