package com.compliancehub.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.annotations.UpdateTimestamp;
import org.hibernate.type.SqlTypes;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Entity
@Table(name = "DPA")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DPA {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID DPAId;

    @OneToMany(
            mappedBy = "dpa",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<Violation> violations = new ArrayList<>();

    @OneToMany(
            mappedBy = "dpa",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<Requirement> requirements = new ArrayList<>();

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(columnDefinition = "jsonb")
    private Map<String, Object> communicationStrats;

    @Column(nullable = false)
    private String customerName;

    @Column(nullable = false)
    private String productName;

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdDate;

//    @UpdateTimestamp
//    @Column(nullable = false)
//    private LocalDateTime lastChangedDate;

    @Column(length = 500, nullable = false)
    private String fileUrl;
}