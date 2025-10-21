package com.compliancehub.model;

//    data_processor_id SERIAL PRIMARY KEY,
//    name VARCHAR(255) NOT NULL,
//    hosting_location VARCHAR(255),
//    service VARCHAR(255),
//    purpose TEXT,
//    note TEXT,
//    website VARCHAR(255)

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "DATA_PROCESSOR")

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DataProcessor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "data_processor_id")
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String hosting_location;

    @Column(nullable = false)
    private String service;

    @Column(nullable = true)
    private String purpose;

    @Column(nullable = true)
    private String note;

    @Column(nullable = true)
    private String website;

}
