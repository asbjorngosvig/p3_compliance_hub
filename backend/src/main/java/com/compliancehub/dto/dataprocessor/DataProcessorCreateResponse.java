package com.compliancehub.dto.dataprocessor;

import com.compliancehub.model.ProcessingLocation;

import java.util.List;
import java.util.UUID;

public record DataProcessorCreateResponse(
        UUID id,
        String name,
        List<String> processingLocations,
        String service,
        String purpose,
        String note,
        String website
) {
}