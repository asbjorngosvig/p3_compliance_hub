package com.compliancehub.data_processor_manager;

import com.compliancehub.compliance_engine.service.ComplianceService;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class DataProcessorService {
    private final DataProcessorRepository dataProcessorRepository;
    private final ComplianceService complianceService;

    public DataProcessorService(DataProcessorRepository dataProcessorRepository, ComplianceService complianceService) {
        this.dataProcessorRepository = dataProcessorRepository;
        this.complianceService = complianceService;
    }

    //Create new data processor
    public DataProcessorDTO.CreateResponse create(DataProcessorDTO.CreateRequest req) {
        //1: bygger ny DP
        DataProcessor newDP = new DataProcessor();
        newDP.setName(req.name());
        newDP.setService(req.service());
        newDP.setPurpose(req.purpose());
        newDP.setNote(req.note());
        newDP.setWebsite(req.website());
        newDP.setProcessingLocations(req.processingLocations());

        //2: tjekker compliance
        complianceService.performComplianceCheckDP(newDP);

        //3: gemmer i databasen
        dataProcessorRepository.save(newDP);

        //4: returnerer ny DP til frontend
        return new DataProcessorDTO.CreateResponse(
            new DataProcessorDTO.StandardDataProcessorResponse(
                newDP.getId(),
                newDP.getName(),
                newDP.getProcessingLocations(),
                newDP.getService(),
                newDP.getPurpose(),
                newDP.getNote(),
                newDP.getWebsite()
            )
        );
    }
    //update data processor
    public DataProcessorDTO.UpdateResponse update(
        UUID id,
        DataProcessorDTO.UpdateRequest req
    ) {
        DataProcessor dp = dataProcessorRepository.findById(id)
            .orElseThrow(() -> new NoSuchElementException(
                "DataProcessor with id " + id + " is not found"
            ));

        dp.setName(req.name());
        dp.setService(req.service());
        dp.setPurpose(req.purpose());
        dp.setNote(req.note());
        dp.setWebsite(req.website());
        dp.setProcessingLocations(req.processingLocations());

        //skal fikses
        complianceService.performComplianceCheckDP(dp);

        DataProcessor updated = dataProcessorRepository.save(dp);

        return new DataProcessorDTO.UpdateResponse(
            new DataProcessorDTO.StandardDataProcessorResponse(
                updated.getId(),
                updated.getName(),
                updated.getProcessingLocations(),
                updated.getService(),
                updated.getPurpose(),
                updated.getNote(),
                updated.getWebsite()
            )
        );
    }

    //Get All Data Processors
    public DataProcessorDTO.GetAllResponse getAllSorted(){
        List<DataProcessorDTO.StandardDataProcessorResponse> allDataProcessors = dataProcessorRepository
            // Hent alle DataProcessors fra DB, sorteret alfabetisk
                .findAll(Sort.by("name").ascending())
                .stream()
            // Konverter hver entitet til DTO:
            // - Eksponerer kun de felter frontend har brug for
            // - Undgår at sende interne felter og relationer (fx violations)
            // - Afkobler API fra database-entity, så ændringer i entiteten ikke bryder frontend
            // - Giver mulighed for at tilføje metadata eller transformationer senere uden at ændre entiteten
                .map(dp -> new DataProcessorDTO.StandardDataProcessorResponse(
                    dp.getId(),
                    dp.getName(),
                    dp.getProcessingLocations(),
                    dp.getService(),
                    dp.getPurpose(),
                    dp.getNote(),
                    dp.getWebsite()
                ))
                .toList();

        // Returner DTO med listen + metadata til frontend
        return new DataProcessorDTO.GetAllResponse(
            allDataProcessors,
            dataProcessorRepository.count(),
            "Alphabetical",
            "Ascending"
        );
    }


    public DataProcessorDTO.StandardDataProcessorResponse getById(UUID id) {
        DataProcessor dp = dataProcessorRepository.findById(id)
            .orElseThrow(() -> new NoSuchElementException(
                "DataProcessor with id " + id + " is not found"
            ));

        return new DataProcessorDTO.StandardDataProcessorResponse(
            dp.getId(),
            dp.getName(),
            dp.getProcessingLocations(),
            dp.getService(),
            dp.getPurpose(),
            dp.getNote(),
            dp.getWebsite()
        );
    }


    public void delete(UUID id){
        if(!dataProcessorRepository.existsById(id)){
            throw new NoSuchElementException("DataProcessor with id " + id + " is not found");
        }
        dataProcessorRepository.deleteById(id);
    }
}