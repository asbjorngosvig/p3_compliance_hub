package com.compliancehub.service;

import com.compliancehub.dto.user.UserGetResponse;
import com.compliancehub.model.User;
import com.compliancehub.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.InputMismatchException;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public UserGetResponse getById(long id) {
        Optional<User> optionalUser = userRepository.findById(id);

        // make sure that user exists before returning
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            return new UserGetResponse(user.getId(), user.getEmail(), user.getName(), user.getRole());
        } else {
            throw new InputMismatchException("Could not find user with id: " +  id);
        }
    }

    public UserGetResponse getByEmail(String email) {
        Optional<User> optionalUser = userRepository.findByEmail(email);

        // make sure that user exists before returning
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            return new UserGetResponse(user.getId(), user.getEmail(), user.getName(), user.getRole());
        } else {
            throw new InputMismatchException("Could not find user with email: " +  email);
        }
    }



}