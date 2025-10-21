package com.compliancehub.service;
import com.compliancehub.model.Admin;
import com.compliancehub.model.Employee;
import com.compliancehub.model.User;
import com.compliancehub.repository.UserRepository;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;

@RequiredArgsConstructor // Lombok laver en constructor med final felter (altså userRepository) automatisk
@Service
public class UserService {
    private final UserRepository userRepository;

/*
    public User createUser(User caller, CreateUserDto dto) {
        if (!caller.isAdmin()) {
            throw new AccessDeniedException("Only admins can create users");
        }
        User newUser = "ADMIN".equalsIgnoreCase(dto.role())
                ? new Admin(dto.name(), dto.email(), dto.password())
                : new Employee(dto.name(), dto.email(), dto.password());

        return userRepository.save(newUser);
    }*/
}

/*
Opret bruger
Tjek rolle
Hash password
Valider input*/ 
