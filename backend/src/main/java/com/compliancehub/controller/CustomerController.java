package com.compliancehub.controller;

import com.compliancehub.model.Customer;
import com.compliancehub.service.CustomerService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.*;

@RestController
@RequestMapping("/customers")
public class CustomerController {

    private final CustomerService service;
    public CustomerController(CustomerService service) { this.service = service; }

    // CREATE
    @PostMapping
    public ResponseEntity<Map<String, Object>> create(@RequestBody Map<String, String> body) {
        String name = body.get("name");
        String institutionType = body.get("institutionType");
        int id = service.create(name, institutionType);
        return ResponseEntity.created(URI.create("/customers/" + id)).body(Map.of("id", id));
    }

    // READ recent
    @GetMapping("/recent")
    public List<Customer> recent(@RequestParam(defaultValue = "20") int limit) {
        return service.recent(limit);
    }

    // READ one
    @GetMapping("/{id}")
    public ResponseEntity<Customer> get(@PathVariable int id) {
        return service.find(id).map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // UPDATE (partial)
    @PutMapping("/{id}")
    public ResponseEntity<Void> update(@PathVariable int id, @RequestBody Map<String, String> body) {
        boolean ok = service.update(id, body.get("name"), body.get("institutionType"));
        return ok ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }

    // DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable int id) {
        return service.delete(id) ? ResponseEntity.noContent().build()
                : ResponseEntity.notFound().build();
    }
}
