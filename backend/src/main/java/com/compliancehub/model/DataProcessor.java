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

    private String name;

    @OneToMany(mappedBy = "")
    private List<ProcessingLocation> processingLocations = new ArrayList<>();

    @Column(length = 500)
    private String service;

    @Column(length = 500)
    private String purpose;

    @Column(columnDefinition = "TEXT")
    private String note;

    @Column(length = 500)
    private String website;

    @OneToMany(mappedBy = "dataProcessor")
    private List<Violation> violations;

}