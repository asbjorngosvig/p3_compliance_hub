package com.compliancehub.dto.user;

public record UserGetResponse(
        long id,
        String email,
        String name,
        String role
) {};
