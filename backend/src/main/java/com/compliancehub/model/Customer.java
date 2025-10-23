package com.compliancehub.model;

import jakarta.persistence.*;

@Entity
@Table(name = "customer")
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "customer_id")
    private int customerId;

    @Column(nullable = false)
    private String name;

    @Column(name = "institution_type", nullable = false)
    private String institutionType;

    // Constructors
    public Customer() {}

    public Customer(String name, String institutionType) {
        this.name = name;
        this.institutionType = institutionType;
    }

    // Getters og setters
    public int getCustomerId() {
        return customerId;
    }

    public void setCustomerId(int customerId) {
        this.customerId = customerId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getInstitutionType() {
        return institutionType;
    }

    public void setInstitutionType(String institutionType) {
        this.institutionType = institutionType;
    }
}
