package com.compliancehub.dto.dataprocessor;

import com.compliancehub.model.ProcessingLocation;

import java.util.List;

public record DataProcessorCreateRequest (
        String name,
        List<ProcessingLocation> processingLocation,
        String service,
        String purpose,
        String note,
        String website
){
}
