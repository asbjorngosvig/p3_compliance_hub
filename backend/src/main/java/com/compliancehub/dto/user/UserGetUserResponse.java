package com.compliancehub.dto.user;

public record UserGetUserResponse(
        long id,
        String email,
        String name,
        String role
) {};
