package com.compliancehub.repository;

import com.compliancehub.model.Customer;
import com.compliancehub.model.DataProcessor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface DataProcessorRepository extends JpaRepository<DataProcessor, Long> {
    Optional<DataProcessor> findById(UUID id);
}
