package com.compliancehub.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
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
    @Column(name = "dpaid")  // <-- ADD THIS LINE
    private UUID id;

    @OneToMany(mappedBy = "dpa", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Violation> violations = new ArrayList<>();

    @OneToMany(mappedBy = "dpa", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Requirement> requirements = new ArrayList<>();

    @OneToMany(mappedBy = "dpa", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CommunicationStrategy> communicationStrats = new ArrayList<>();

    @Column(nullable = false)
    private String customerName;

    @Column(nullable = false)
    private String productName;

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdDate;

    @Column(length = 500, nullable = false)
    private String fileUrl;

    // --- HELPER METHODS ---
    public void addRequirement(Requirement req) {
        requirements.add(req);
        req.setDpa(this); // Sætter foreign key på barnet
    }

    public void addCommunicationStrategy(CommunicationStrategy strat) {
        communicationStrats.add(strat);
        strat.setDpa(this); // Sætter foreign key på barnet
    }

    public void addViolation(Violation violation) {
        violations.add(violation);
        violation.setDpa(this); // Sætter foreign key på barnet
    }
}