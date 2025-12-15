package com.compliancehub.dto;

import org.hibernate.validator.constraints.URL;

import java.util.List;
import java.util.UUID;

public class DataProcessorDTO {

    // Private constructor to hide the implicit public one
    private DataProcessorDTO() {}

    public record CreateRequest(
        String name,
        List<String> processingLocations,
        String service,
        String purpose,
        String note,
        @URL(message = "Website must be a valid URL")
        String website
    ) {}

    public record StandardDataProcessorResponse(
        UUID id,
        String name,
        List<String> processingLocations,
        String service,
        String purpose,
        String note,
        String website
    ) {}

    public record UpdateRequest(
            String name,
            List<String> processingLocations,
            String service,
            String purpose,
            String note,
            @URL(message = "Website must be a valid URL")
            String website
    ) {}

    public record CreateResponse(
        StandardDataProcessorResponse createdDataProcessor
    ) {}

    public record UpdateResponse(
            StandardDataProcessorResponse updatedDataProcessor
    ) {}
    public record GetAllResponse(
        List<StandardDataProcessorResponse> allDataProcessors,
        Long totalCount,
        String sortedBy,
        String order
    ) {}


}
