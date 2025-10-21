package com.compliancehub.service;

import com.compliancehub.model.DataProcessor;
import com.compliancehub.repository.DataProcessorRepository;
import com.compliancehub.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class DataProcessorService {
    private final DataProcessorRepository dataProcessorRepository;

    public DataProcessor createDataProcessor() {
        DataProcessorRepository.save(DataProcessor);
        return new DataProcessor();
    }

    public DataProcessor updateDataProcessor(Long id) {
        DataProcessor = DataProcessorRepository.findDataProcessorById(Long id);
        if(DataProcessorRepository.existsById(id)) {
            DataProcessorRepository.save(DataProcessor);
        }
        return new DataProcessor();
    }

    public DataProcessor deleteDataProcessor(Long id) {
        DataProcessorRepository.delete(DataProcessor);
        return null;
    }

    public DataProcessor findDataProcessorById(Long id) {
        return dataProcessorRepository.findById(id).orElse(null);
    }
}
