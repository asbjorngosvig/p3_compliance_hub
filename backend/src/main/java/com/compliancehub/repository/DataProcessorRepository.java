package com.compliancehub.repository;

import com.compliancehub.model.Customer;
import com.compliancehub.model.DataProcessor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface DataProcessorRepository extends JpaRepository<DataProcessor, Long> { }
