package com.compliancehub.service;

import com.compliancehub.dto.DataProcessorDTO;
import com.compliancehub.model.DataProcessor;
import com.compliancehub.repository.DataProcessorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.InputMismatchException;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class DataProcessorService {
    private final DataProcessorRepository dataProcessorRepository;

    public DataProcessorDTO.CreateResponse create(DataProcessorDTO.CreateRequest req) {
        // Convert DTO to DP entity
        DataProcessor newDP = new DataProcessor();
        newDP.setName(req.name());
        newDP.setService(req.service());
        newDP.setPurpose(req.purpose());
        newDP.setNote(req.note());
        newDP.setWebsite(req.website());
        newDP.setProcessingLocations(req.processingLocations());

        DataProcessor savedDP = dataProcessorRepository.save(newDP);

        return new DataProcessorDTO.CreateResponse(
            savedDP.getId(),
            savedDP.getName(),
            savedDP.getProcessingLocations(),
            savedDP.getService(),
            savedDP.getPurpose(),
            savedDP.getNote(),
            savedDP.getWebsite()
        );
    }
}