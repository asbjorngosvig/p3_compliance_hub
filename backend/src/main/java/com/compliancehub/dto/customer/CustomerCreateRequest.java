package com.compliancehub.dto.customer;

// Bruges til at modtage data, når en kunde oprettes (POST request)
public record CustomerCreateRequest(
        String name
) {}