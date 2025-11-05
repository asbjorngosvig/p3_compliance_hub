package com.compliancehub.model;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
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
@Data
@NoArgsConstructor
@AllArgsConstructor
public class DPA {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long DPAId;

    @OneToMany(mappedBy = "dpa", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Violation> violations = new ArrayList<>();

    private String customerName;

    private String productName;

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdDate; 
    
    @UpdateTimestamp
    @Column(nullable = false)
    private LocalDateTime lastChangedDate;

    private String fileUrl;

    @OneToMany(mappedBy = "")
    private List<ProcessingLocation> allowedProcessinglocations = new ArrayList<>();

    private boolean isStandard;
}