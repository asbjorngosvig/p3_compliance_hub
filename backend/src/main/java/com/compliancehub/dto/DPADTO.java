package com.compliancehub.dto;

import com.compliancehub.model.Violation;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class DPADTO {

    // Private constructor to hide the implicit public one
    private DPADTO() { }

    public record DPAResponse(
            UUID id,
            List<Violation> violations,
            String customerName,
            String productName
    ) {}

    public record GetAllResponse(
            List<DPAResponse> allDPA,
            Long totalCount,
            String sortedBy,
            String order
    ) {}
}
