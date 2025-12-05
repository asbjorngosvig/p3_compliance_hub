package com.compliancehub.model;

import com.fasterxml.jackson.annotation.JsonIgnore; // VIGTIG IMPORT
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.util.Map;
import java.util.UUID;

@Entity
@Table(name = "requirement")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Requirement {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID requirementID;

    @JsonIgnore // Forhindrer uendeligt JSON loop
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "dpa_id", nullable = false)
    private DPA dpa;

    private String reqEvaluator;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(columnDefinition = "jsonb")
    private Map<String, Object> attributes;
}