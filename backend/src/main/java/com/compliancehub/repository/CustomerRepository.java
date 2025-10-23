package com.compliancehub.repository;

import com.compliancehub.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Integer> {
    // Henter de 20 nyeste kunder (baseret på id som proxy for recency)
    List<Customer> findTop20ByOrderByCustomerIdDesc();
}
