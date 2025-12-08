package com.compliancehub.dto;

public class ActionDTO {
    public record standardResponse(
            String message,
            java.util.UUID id
    ){}
}
