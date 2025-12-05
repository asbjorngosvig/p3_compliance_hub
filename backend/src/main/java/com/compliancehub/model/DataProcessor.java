package com.compliancehub.model;

import com.fasterxml.jackson.annotation.JsonIgnore; // Husk import
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

    @JdbcTypeCode(SqlTypes.ARRAY)
    @Column(name = "processing_locations", columnDefinition = "text[]")
    private List<String> processingLocations = new ArrayList<>();

    @Column(length = 500, nullable = false)
    private String service;

    @Column(length = 500, nullable = false)
    private String purpose;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String note;

    @Column(length = 500, nullable = false)
    private String website;

    // Vi sætter @JsonIgnore her, fordi det er vigtigere at se "Hvem?"
    // inde på Violation-objektet, end at se "Hvad har de gjort?"
    // når vi bare slår en processor op.
    @JsonIgnore
    @OneToMany(mappedBy = "dataProcessor")
    private List<Violation> violations;

}