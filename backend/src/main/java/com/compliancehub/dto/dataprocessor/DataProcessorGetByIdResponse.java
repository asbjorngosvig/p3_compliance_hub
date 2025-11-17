package com.compliancehub.dto.dataprocessor;

import com.compliancehub.model.ProcessingLocation;

import java.util.List;
import java.util.UUID;

public record DataProcessorGetByIdResponse(
        UUID id,
        String name,
        List<ProcessingLocation> processingLocation,
        String service,
        String purpose,
        String note,
        String website
) {
}
