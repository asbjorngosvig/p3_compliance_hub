package com.compliancehub.controller;

import com.compliancehub.dto.customer.CustomerCreateRequest;
import com.compliancehub.dto.customer.CustomerCreateResponse;
import com.compliancehub.model.Customer;
import com.compliancehub.service.CustomerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.net.URI;
import java.util.*;

@RestController
@RequestMapping("/customers")
@RequiredArgsConstructor
public class CustomerController {
    private final CustomerService service;

    // CREATE
    @PostMapping
    public ResponseEntity<CustomerCreateResponse> create(@RequestBody CustomerCreateRequest req) {
        // 1. Call the service to create the resource and get the response DTO
        CustomerCreateResponse newCustomer = service.create(req);

        // 2. Build the URI using the ID from the returned res-DTO
        // hedder ik newCustomer.getId(), fordi det en record. getteren er bare navnet
        URI location = URI.create("/customers/" + newCustomer.id());

        // 3. Return the response using the res-DTO
        return ResponseEntity.created(location).body(newCustomer);
    }

    // READ recent
    @GetMapping("/recent")
    public List<Customer> recent(@RequestParam(defaultValue = "20") int limit) {
        return service.recent(limit);
    }

    // READ one
    @GetMapping("/{id}")
    public ResponseEntity<Customer> get(@PathVariable Long id) {
        return service.find(id).map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // UPDATE (partial)
    @PutMapping("/{id}")
    public ResponseEntity<Void> update(@PathVariable Long id, @RequestBody Map<String, String> body) {
        boolean ok = service.update(id, body.get("name"), body.get("institutionType"));
        return ok ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }

    // DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        return service.delete(id) ? ResponseEntity.noContent().build()
                : ResponseEntity.notFound().build();
    }
}
