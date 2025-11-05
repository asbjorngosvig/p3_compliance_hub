package com.compliancehub.model;


import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.cglib.core.Local;

import java.io.File;
import java.net.URL;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "DPA")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DPA {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long DPAId;

    @OneToMany(
            mappedBy = "dpa",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<Violation> violations = new ArrayList<>();

    @Column(nullable = false)
    private String customerName;

    @Column(nullable = false)
    private String productName;

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdDate; 
    
    @UpdateTimestamp
    @Column(nullable = false)
    private LocalDateTime lastChangedDate;

    @Column(length = 500, nullable = false)
    private String fileUrl;

    @OneToMany(mappedBy = "") //tilføj mere når location er oprettet
    private List<ProcessingLocation> allowedProcessinglocations = new ArrayList<>();

    @Column(nullable = false)
    private boolean isStandard;
}