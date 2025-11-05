package com.compliancehub.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class ProcessingLocation {
    @Id
    private Long id;


}
