package com.compliancehub.compliance_engine.model;

import com.compliancehub.dpa_manager.DPA;
import com.fasterxml.jackson.annotation.JsonIgnore; // VIGTIG IMPORT
import jakarta.persistence.*;
import lombok.*; // Tilføjet Lombok
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.util.Map;
import java.util.UUID;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CommunicationStrategy {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @JsonIgnore // Forhindrer uendeligt JSON loop
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "dpa_id", nullable = false)
    private DPA dpa;

    private String strategy;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(columnDefinition = "jsonb")
    private Map<String, Object> attributes;
}