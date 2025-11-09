package com.compliancehub.dto.dataprocessor;

import com.compliancehub.model.ProcessingLocation;

import java.util.List;

public record DataProcessorCreateResponse(
        long id,
        String name,
        List<ProcessingLocation> processingLocations,
        String service,
        String purpose,
        String note,
        String website
) {
}