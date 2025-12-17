package com.compliancehub.compliance_engine.dto;

public class ActionDTO {
    public record standardResponse(
            String description,
            java.util.UUID id
    ){}
}
