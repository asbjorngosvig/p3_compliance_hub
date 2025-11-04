package com.compliancehub.repository;

import com.compliancehub.model.DPA;
import com.compliancehub.model.DataProcessor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DPARepository extends JpaRepository<DPA, Long> { }

