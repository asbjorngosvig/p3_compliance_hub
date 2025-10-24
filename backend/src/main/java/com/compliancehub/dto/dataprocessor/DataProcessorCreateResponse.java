package com.compliancehub.dto.dataprocessor;

public record DataProcessorCreateResponse(
        long id,
        String name,
        String hosting_location,
        String service,
        String purpose,
        String note,
        String website
) {
}