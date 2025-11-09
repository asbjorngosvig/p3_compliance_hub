package com.compliancehub.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "data_processor")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DataProcessor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @OneToMany(mappedBy = "") //tilføjes senere
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
    private List<Violation> violations;

}