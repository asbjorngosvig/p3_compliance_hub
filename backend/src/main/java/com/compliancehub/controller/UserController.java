package com.compliancehub.controller;

import com.compliancehub.dto.user.UserGetByIdResponse;
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
    private ResponseEntity<UserGetByIdResponse> getUserById(@PathVariable long id) {
        UserGetByIdResponse user = service.getById(id);

        URI location = URI.create("/users/" + user.id());

        return ResponseEntity.created(location).body(user);
    }

    @GetMapping("/email/{email}")
    private ResponseEntity<UserGetByIdResponse> getUserByEmail(@PathVariable String email) {
        UserGetByIdResponse user = service.getByEmail(email);

        URI location = URI.create("/users/" + user.email());

        return ResponseEntity.created(location).body(user);
    }

}
