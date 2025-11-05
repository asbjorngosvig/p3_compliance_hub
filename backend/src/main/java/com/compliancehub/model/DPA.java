package com.compliancehub.model;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

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


    @OneToMany(mappedBy = "", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Violation> violations;

    private String customerName;

    private String productName;

    @Column(nullable = false, updatable = false)
    @CreationTimestamp
    private Date creationDate;


}
