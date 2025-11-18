package com.compliancehub.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "data_processor")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DataProcessor {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private String name;

    @JdbcTypeCode(SqlTypes.ARRAY) // Tells Hibernate: "This is a SQL Array (text[])"
    @Column(name = "processing_locations", columnDefinition = "text[]") // Optional: ensures DB creates text[] column
    private List<String> processingLocations = new ArrayList<>();

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