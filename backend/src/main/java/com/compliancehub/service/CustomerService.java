package com.compliancehub.service;

import com.compliancehub.model.Customer;
import com.compliancehub.repository.CustomerRepository;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class CustomerService {

    private final CustomerRepository repo;

    public CustomerService(CustomerRepository repo) {
        this.repo = repo;
    }

    // CREATE
    public UUID create(String name, String email, String institutionType) {
        Customer c = new Customer(name, email, institutionType);
        repo.save(c);
        return c.getId();
    }

    // READ - recent
    public List<Customer> recent(int limit) {
        return repo.findTop20ByOrderByCreatedAtDesc();
    }

    // READ - single
    public Optional<Customer> find(UUID id) {
        return repo.findById(id);
    }

    // UPDATE
    public boolean update(UUID id, String name, String email, String institutionType) {
        return repo.findById(id).map(c -> {
            if (name != null) c.setName(name);
            if (email != null) c.setEmail(email);
            if (institutionType != null) c.setInstitutionType(institutionType);
            repo.save(c);
            return true;
        }).orElse(false);
    }

    // DELETE
    public boolean delete(UUID id) {
        if (repo.existsById(id)) {
            repo.deleteById(id);
            return true;
        }
        return false;
    }
}
