package com.compliancehub.controller;

import com.compliancehub.dto.user.UserGetUserResponse;
import com.compliancehub.service.UserService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;

@RestController
@RequestMapping("/users")

public class UserController {
    UserService service;

    public UserController(UserService service) {
        this.service = service;
    }

    @GetMapping("/{id}")
    private ResponseEntity<UserGetUserResponse> getUserById(@PathVariable long id) {
        UserGetUserResponse user = service.getById(id);

        URI location = URI.create("/users/" + user.id());

        return ResponseEntity.created(location).body(user);
    }

    @GetMapping("/email/{email}")
    private ResponseEntity<UserGetUserResponse> getUserByEmail(@PathVariable String email) {
        UserGetUserResponse user = service.getByEmail(email);

        URI location = URI.create("/users/" + user.email());

        return ResponseEntity.created(location).body(user);
    }

}
