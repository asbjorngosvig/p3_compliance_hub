package com.compliancehub.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "violation")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Violation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "violation_id")
    private Long violationId;
}
