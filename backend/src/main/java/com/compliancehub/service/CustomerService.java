package com.compliancehub.service;

import com.compliancehub.model.Customer;
import com.compliancehub.repository.CustomerRepositoryJdbc;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CustomerService {

    private final CustomerRepositoryJdbc repo;
    public CustomerService(CustomerRepositoryJdbc repo) { this.repo = repo; }

    public int create(String name, String institutionType) {
        return repo.create(name, institutionType);
    }

    public List<Customer> recent(int limit) { return repo.recent(limit); }

    public Optional<Customer> find(int id) { return repo.find(id); }

    public boolean update(int id, String name, String institutionType) {
        return repo.update(id, name, institutionType);
    }

    public boolean delete(int id) { return repo.delete(id); }
}
