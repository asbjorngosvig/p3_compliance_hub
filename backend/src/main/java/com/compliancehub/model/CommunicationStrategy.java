package com.compliancehub.model;

import jakarta.persistence.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.util.Map;
import java.util.UUID;

@Entity
public class CommunicationStrategy {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID DPAId;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "dpa_id", nullable = false)
    private DPA dpa;

    private String strategy;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(columnDefinition = "jsonb")
    private Map<String, Object> attributes;

}
