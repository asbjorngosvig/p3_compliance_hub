package com.compliancehub.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "data_processor")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class DataProcessor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "data_processor_id")
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String hosting_location;

    @Column(nullable = false)
    private String service;

    @Column(nullable = false)
    private String purpose;

    @Column(nullable = false)
    private String note;

    @Column(nullable = false)
    private String website;
}