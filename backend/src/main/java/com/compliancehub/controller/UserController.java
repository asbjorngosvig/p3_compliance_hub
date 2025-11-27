package com.compliancehub.controller;

import com.compliancehub.dto.user.UserGetUserResponse;
import com.compliancehub.dto.user.UserLoginDTO;
import com.compliancehub.model.User;
import com.compliancehub.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/users")

public class UserController {

    @Autowired
    private UserService service;

    public UserController(UserService service) {
        this.service = service;
    }

    @GetMapping("/{id}")
    private ResponseEntity<UserGetUserResponse> getUserById(@PathVariable UUID id) {
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
    public User register(@RequestBody UserLoginDTO userDTO){
        return service.register(userDTO);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserLoginDTO userDTO){
        String token = service.verify(userDTO);

        ResponseCookie cookie = ResponseCookie.from("jwt", token)
                .httpOnly(true)
                .secure(true) // true in prod
                .path("/")
                .maxAge(24 * 60 * 60)
                .sameSite("None")
                .build();

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body("Login successful");
    }

}
