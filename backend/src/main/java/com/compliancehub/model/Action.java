package com.compliancehub.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "action")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Action {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long actionId;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "violation_id", nullable = false)
    private Violation violation;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String description;

    private LocalDateTime dueDate;

    @Column(nullable = false)
    private boolean isResolved = false;
}