package com.compliancehub.service;

import com.compliancehub.dto.DataProcessorDTO;
import com.compliancehub.model.DPA;
import com.compliancehub.model.DataProcessor;
import com.compliancehub.repository.DataProcessorRepository;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class DataProcessorService {
    private final DataProcessorRepository dataProcessorRepository;
    private final DPAService dpaService;

    public DataProcessorService(DataProcessorRepository dataProcessorRepository, DPAService dpaService) {
        this.dataProcessorRepository = dataProcessorRepository;
        this.dpaService = dpaService;
    }

    //Create new data processor
    public DataProcessorDTO.CreateResponse create(DataProcessorDTO.CreateRequest req) {
        DataProcessor newDP = new DataProcessor();
        newDP.setName(req.name());
        newDP.setService(req.service());
        newDP.setPurpose(req.purpose());
        newDP.setNote(req.note());
        newDP.setWebsite(req.website());
        newDP.setProcessingLocations(req.processingLocations());

        DataProcessor savedDP = dataProcessorRepository.save(newDP);

        // evaluate for new violations
        List<DPA> dpaList = dpaService.getAllEntities();
        for (DPA dpa : dpaList) {
            dpaService.evaluateAllRequirements(dpa, savedDP);
        }

        return new DataProcessorDTO.CreateResponse(
            new DataProcessorDTO.StandardDataProcessorResponse(
                savedDP.getId(),
                savedDP.getName(),
                savedDP.getProcessingLocations(),
                savedDP.getService(),
                savedDP.getPurpose(),
                savedDP.getNote(),
                savedDP.getWebsite()
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

        DataProcessor updated = dataProcessorRepository.save(dp);

        for (DPA dpa : dpaService.getAllEntities()) {
            dpaService.evaluateAllRequirements(dpa, updated);
        }

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