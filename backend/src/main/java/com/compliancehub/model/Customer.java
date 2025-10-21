package com.compliancehub.model;

public class Customer {
    private Integer id;             // customer_id
    private String name;
    private String institutionType; // institution_type

    public Customer(Integer id, String name, String institutionType) {
        this.id = id;
        this.name = name;
        this.institutionType = institutionType;
    }

    public Integer getId() { return id; }
    public String getName() { return name; }
    public String getInstitutionType() { return institutionType; }

    public void setName(String name) { this.name = name; }
    public void setInstitutionType(String institutionType) { this.institutionType = institutionType; }
}
