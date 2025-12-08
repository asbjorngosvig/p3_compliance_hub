package com.compliancehub.dto;

import java.util.List;

public class ViolationDTO {
    public record standardResponse(
            String message,
            java.util.UUID id,
            List<ActionDTO.standardResponse> actions
    ){}
}
