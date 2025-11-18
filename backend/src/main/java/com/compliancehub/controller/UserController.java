package com.compliancehub.controller;

import com.compliancehub.dto.user.UserGetUserResponse;
import com.compliancehub.model.User;
import com.compliancehub.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RestController
@RequestMapping("/users")

public class UserController {

    @Autowired
    private UserService service;

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

    @PostMapping("/register")
    public User register(@RequestBody User user){
        return service.register(user);
    }

    @PostMapping("/login")
    public String login(@RequestBody User user){
        return service.verify(user);
    }
}
