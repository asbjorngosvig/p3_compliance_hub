package com.compliancehub.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

import static jakarta.persistence.CascadeType.ALL;

@Entity
@Table(name = "violation")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Violation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long violationId;

    @ManyToOne
    private DPA dpa;

    @ManyToOne
    private DataProcessor dataProcessor;

    @OneToMany(mappedBy = "violation", cascade = ALL, orphanRemoval = true)
    private List<Action> actions = new ArrayList<>();

    @Column(columnDefinition = "TEXT")
    private String description;

    private boolean isResolved = false;
}
