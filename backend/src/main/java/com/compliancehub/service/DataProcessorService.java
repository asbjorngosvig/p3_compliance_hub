package com.compliancehub.service;

import com.compliancehub.dto.dataprocessor.DataProcessorGetResponse;

import com.compliancehub.dto.user.UserGetResponse;
import com.compliancehub.model.DataProcessor;
import com.compliancehub.model.User;
import com.compliancehub.repository.DataProcessorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.InputMismatchException;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class DataProcessorService {
    private final DataProcessorRepository dataProcessorRepository;

    public DataProcessorGetResponse getById(long id) {
        Optional<DataProcessor> optionalDataProcessor = dataProcessorRepository.findById(id);

        // make sure that data processor exists before returning
        if (optionalDataProcessor.isPresent()) {
            DataProcessor dp = optionalDataProcessor.get();
            return new DataProcessorGetResponse(dp.getId(),dp.getName(),dp.getHosting_location(),dp.getService(),dp.getNote(),dp.getWebsite());
        } else {
            throw new InputMismatchException("Could not find data processor with id: " +  id);
        }
    }
}
