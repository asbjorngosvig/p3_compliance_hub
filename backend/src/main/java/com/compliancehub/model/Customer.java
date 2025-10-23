package com.compliancehub.model;

import jakarta.persistence.*;
import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "customer")
public class Customer {

    @Id
    @GeneratedValue
    private UUID id;

    private String name;
    private String email;

    @Column(name = "institution_type")
    private String institutionType;

    @Column(name = "created_at")
    private Instant createdAt = Instant.now();


    public Customer() {}

    public Customer(String name, String email, String institutionType) {
        this.name = name;
        this.email = email;
        this.institutionType = institutionType;
    }

    public UUID getId() { return id; }
    public String getName() { return name; }
    public String getEmail() { return email; }
    public String getInstitutionType() { return institutionType; }
    public Instant getCreatedAt() { return createdAt; }


    public void setName(String name) { this.name = name; }
    public void setEmail(String email) { this.email = email; }
    public void setInstitutionType(String institutionType) { this.institutionType = institutionType; }
}
