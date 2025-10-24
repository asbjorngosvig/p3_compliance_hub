package com.compliancehub.controller;

import com.compliancehub.dto.user.UserGetResponse;
import com.compliancehub.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {
    UserService service;
    @GetMapping("/{id}")
    private ResponseEntity<UserGetResponse> getUserById(@PathVariable long id) {
        UserGetResponse user = service.getById(id);

        URI location = URI.create("/users/" + user.id());

        // 3. Return the response using the res-DTO
        return ResponseEntity.created(location).body(user);
    }

}
