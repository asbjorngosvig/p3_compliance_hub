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
    @Column(name = "data_processor_id")
    private Long id;

    private String name;

    @OneToMany(mappedBy = "")
    private List<ProcessingLocation> processinglocations = new ArrayList<>();

    private String service;

    private String purpose;

    private String note;

    private String website;

    @OneToMany(mappedBy = "dpa")
    private List<Violation> violations;

}