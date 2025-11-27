package com.compliancehub.service;

import com.compliancehub.dto.DataProcessorDTO;
import com.compliancehub.model.DataProcessor;
import com.compliancehub.repository.DataProcessorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class DataProcessorService {
    private final DataProcessorRepository dataProcessorRepository;

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

        return new DataProcessorDTO.CreateResponse(
            new DataProcessorDTO.DataProcessorResponse(
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

    //Get All Data Processors
    public DataProcessorDTO.GetAllResponse getAll(){
        List<DataProcessorDTO.DataProcessorResponse> allDataProcessors = dataProcessorRepository
            // Hent alle DataProcessors fra DB, sorteret alfabetisk
                .findAll(Sort.by("name").ascending())
                .stream()
            // Konverter hver entitet til DTO:
            // - Eksponerer kun de felter frontend har brug for
            // - Undgår at sende interne felter og relationer (fx violations)
            // - Afkobler API fra database-entity, så ændringer i entiteten ikke bryder frontend
            // - Giver mulighed for at tilføje metadata eller transformationer senere uden at ændre entiteten
                .map(dp -> new DataProcessorDTO.DataProcessorResponse(
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

    public void delete(UUID id){
        if(!dataProcessorRepository.existsById(id)){
            throw new NoSuchElementException("DataProcessor with id " + id + " is not found");
        }
        dataProcessorRepository.deleteById(id);
    }
}