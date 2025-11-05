package com.compliancehub.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "action")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Action {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long actionId;

    @Column(nullable = false)
    @ManyToOne
    private Violation violation;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String description;

    private LocalDateTime dueDate;

    @Column(nullable = false)
    private boolean isResolved = false;
}