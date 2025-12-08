package com.compliancehub.dto;

import com.compliancehub.model.CommunicationStrategy;
import com.compliancehub.model.Requirement;
import com.compliancehub.model.Violation;
import org.hibernate.validator.constraints.URL;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public class DPA_DTO {
    public record CreateRequest(
        List<String> allowedProcessingLocations,
        boolean needWrittenAprooval,
        Integer daysOfNotice,
        String customerName,
        String productName,
        @URL(message = "Source must be a valid URL")
        String fileUrl
    ){}

    public record StandardDPAResponse(
        UUID id,
        List<ViolationDTO.standardResponse> violations, // violations have actions
        String customerName,
        String productName,
        LocalDateTime createdDate,
        String fileUrl
    ){}

    public record CreateResponse(
        StandardDPAResponse createdDPA
    ){}
    public record GetAllResponse(
            List<StandardDPAResponse> dpas,
            long totalCount
    ){}

}
