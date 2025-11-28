package com.compliancehub.dto.user;

import java.util.List;
import java.util.UUID;

public class UserDTO {

    // Private constructor to hide the implicit public one
    private UserDTO() {}

    public record UserResponse(
            UUID id,
            String name,
            String email,
            String role
    ) {}

    public record CreateRequest(
            String name,
            String email,
            String password,
            String role
    ){}

    public record CreateResponse(
            UserResponse createdUser
    ) {}

    public record GetAllResponse(
            List<UserResponse> users,
            long totalCount,
            String sortedBy,
            String order
    ) {}
}
