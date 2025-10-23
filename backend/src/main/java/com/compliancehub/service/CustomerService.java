package com.compliancehub.service;

import com.compliancehub.model.Customer;
import com.compliancehub.repository.CustomerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CustomerService {

    private final CustomerRepository repository;

    // CREATE
    public int create(String name, String institutionType) {
        Customer c = new Customer();
        c.setName(name);
        c.setInstitutionType(institutionType);
        repository.save(c);
        return c.getCustomerId(); // returnér det genererede id
    }

    // READ (recent customers)
    public List<Customer> recent(int limit) {
        return repository.findTop20ByOrderByCustomerIdDesc(); // max 20 kunder fx
    }

    // READ one
    public Optional<Customer> find(int id) {
        return repository.findById(id);
    }

    // UPDATE
    public boolean update(int id, String name, String institutionType) {
        return repository.findById(id).map(c -> {
            if (name != null && !name.isBlank()) c.setName(name);
            if (institutionType != null && !institutionType.isBlank()) c.setInstitutionType(institutionType);
            repository.save(c);
            return true;
        }).orElse(false);
    }

    // DELETE
    public boolean delete(int id) {
        if (!repository.existsById(id)) return false;
        repository.deleteById(id);
        return true;
    }
}
