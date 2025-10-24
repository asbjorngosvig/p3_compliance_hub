package com.compliancehub.dto.dataprocessor;

public record DataProcessorGetResponse(
        long id,
        String name,
        String hosting_location,
        String service,
        String note,
        String website
) {
}
