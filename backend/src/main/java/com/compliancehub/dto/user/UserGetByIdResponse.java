package com.compliancehub.dto.user;

public record UserGetByIdResponse(
        long id,
        String email,
        String name,
        String role
) {};
