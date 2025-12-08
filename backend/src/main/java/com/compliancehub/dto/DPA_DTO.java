package com.compliancehub.dto;

import com.compliancehub.model.CommunicationStrategy;
import com.compliancehub.model.Requirement;
import com.compliancehub.model.Violation;
import org.hibernate.validator.constraints.URL;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public class DPA_DTO {
    public record CreateRequest(
        List<Requirement> requirements,
        List<CommunicationStrategy> communicationStrategies,
        String customerName,
        String productName,
        @URL(message = "Source must be a valid URL")
        String fileUrl
    ){}

    public record StandardDPAResponse(
        UUID id,
        List<Violation> violations,
        List<Requirement> requirements,
        List<CommunicationStrategy> communicationStrats,
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
