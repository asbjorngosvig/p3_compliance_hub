package com.compliancehub.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "data_processor")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class DataProcessor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @OneToMany(mappedBy = "")
    @Column(nullable = false)
    private List<ProcessingLocation> processingLocations = new ArrayList<>();

    @Column(length = 500, nullable = false)
    private String service;

    @Column(length = 500, nullable = false)
    private String purpose;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String note;

    @Column(length = 500, nullable = false)
    private String website;

    @OneToMany(mappedBy = "dataProcessor")
    @Column(nullable = false)
    private List<Violation> violations;

}