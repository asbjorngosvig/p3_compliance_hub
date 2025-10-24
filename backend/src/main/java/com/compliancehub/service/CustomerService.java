package com.compliancehub.service;

import com.compliancehub.dto.customer.CustomerCreateRequest;
import com.compliancehub.dto.customer.CustomerCreateResponse;
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

    // CREATE NEW CUSTOMER
    public CustomerCreateResponse create(CustomerCreateRequest req) {
        //1. create and save entity
        Customer newCustomer = new Customer();
        newCustomer.setName(req.name());
        Customer savedCustomer = repository.save(newCustomer);

        //2. build and return response DTO
        return new CustomerCreateResponse(savedCustomer.getCustomerId());
    }

    /* READ (recent customers)
    public List<Customer> recent(int limit) {
        return repository.findTop20ByOrderByCustomerIdDesc(); // max 20 kunder fx
    }

    // READ one
    public Optional<Customer> find(Long id) {
        return repository.findById(id);
    }

    // UPDATE
    public boolean update(Long id, String name, String institutionType) {
        return repository.findById(id).map(c -> {
            if (name != null && !name.isBlank()) c.setName(name);
            if (institutionType != null && !institutionType.isBlank()) c.setInstitutionType(institutionType);
            repository.save(c);
            return true;
        }).orElse(false);
    }

    // DELETE
    public boolean delete(Long id) {
        if (!repository.existsById(id)) return false;
        repository.deleteById(id);
        return true;
    }*/
}
