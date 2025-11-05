package com.compliancehub.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

import static jakarta.persistence.CascadeType.ALL;

@Entity
@Table(name = "violation")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Violation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long violationId;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "dpa_id", nullable = false)
    private DPA dpa;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "data_processor_id", nullable = false)
    private DataProcessor dataProcessor;

    @OneToMany(
            mappedBy = "violation",
            cascade = ALL,
            orphanRemoval = true
    )
    private List<Action> actions = new ArrayList<>();

    @Column(columnDefinition = "TEXT", nullable = false)
    private String description;

    @Column(nullable = false)
    private boolean isResolved = false;
}
