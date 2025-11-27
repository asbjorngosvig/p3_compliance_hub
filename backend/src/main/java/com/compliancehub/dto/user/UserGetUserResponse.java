package com.compliancehub.dto.user;

import java.util.UUID;

public record UserGetUserResponse(
        UUID id,
        String email,
        String name,
        String role
) {};
