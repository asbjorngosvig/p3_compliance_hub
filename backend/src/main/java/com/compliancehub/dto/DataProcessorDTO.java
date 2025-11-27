package com.compliancehub.dto;

import com.compliancehub.model.DataProcessor;
import org.hibernate.validator.constraints.URL;

import java.util.List;
import java.util.UUID;

public class DataProcessorDTO {

    // Private constructor to hide the implicit public one
    private DataProcessorDTO() {}

    public record DataProcessorResponse(
        UUID id,
        String name,
        List<String> processingLocations,
        String service,
        String purpose,
        String note,
        String website
    ) {}

    public record CreateRequest(
        String name,
        List<String> processingLocations,
        String service,
        String purpose,
        String note,
        @URL(message = "Website must be a valid URL")
        String website
    ) {}

    public record CreateResponse(
        DataProcessorResponse createdDataProcessor
    ) {}

    public record GetAllResponse(
        List<DataProcessorResponse> allDataProcessors,
        Long totalCount,
        String sortedBy,
        String order
    ) {}
}
