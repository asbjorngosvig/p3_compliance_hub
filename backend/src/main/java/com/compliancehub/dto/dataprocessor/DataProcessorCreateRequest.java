package com.compliancehub.dto.dataprocessor;

public record DataProcessorCreateRequest (
        String name,
        String hosting_location,
        String service,
        String purpose,
        String note,
        String website
){
}
