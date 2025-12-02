package com.compliancehub.controller;

import com.compliancehub.dto.user.UserDTO;
import com.compliancehub.dto.user.UserLoginDTO;
import com.compliancehub.model.User;
import com.compliancehub.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    private ResponseEntity<UserDTO.UserResponse> getUserById(@PathVariable UUID id) {
        UserDTO.UserResponse userDTO = service.getById(id);

        return ResponseEntity.ok(userDTO);
    }

    @GetMapping("/email/{email}")
    private ResponseEntity<UserDTO.UserResponse> getUserByEmail(@PathVariable String email) {
        UserDTO.UserResponse userDTO = service.getByEmail(email);

        return ResponseEntity.ok(userDTO);
    }

    @PostMapping("/register")
    public ResponseEntity<UserDTO.CreateResponse> registerUser(@RequestBody UserDTO.CreateRequest createRequest) {
        var createdUser = service.registerUser(createRequest);
        System.out.println(service.getByEmail("ryan@test.com"));
        return ResponseEntity.status(201).body(new UserDTO.CreateResponse(createdUser));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserLoginDTO userDTO){
        String token = service.verify(userDTO);

        ResponseCookie cookie = ResponseCookie.from("jwt", token)
                .httpOnly(true)
                .secure(false) // true in prod
                .path("/")
                .maxAge(24 * 60 * 60)
                .sameSite("Lax")
                .build();

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body("Login successful");
    }

}
