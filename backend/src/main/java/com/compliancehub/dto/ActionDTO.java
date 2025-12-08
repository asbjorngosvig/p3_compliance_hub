package com.compliancehub.dto;

public class ActionDTO {
    public record standardResponse(
            String description,
            java.util.UUID id
    ){}
}
