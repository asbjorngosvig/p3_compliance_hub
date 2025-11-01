package com.compliancehub.service;

import com.compliancehub.dto.customer.CustomerCreateRequest;
import com.compliancehub.dto.customer.CustomerCreateResponse;
import com.compliancehub.model.Customer;
import com.compliancehub.repository.CustomerRepository;
import lombok.RequiredArgsConstructor;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.test.web.servlet.MockMvc;

public class CustomerService {

    @Autowired
    private MockMvc mockMvc;

    @BeforeEach
    void setUp() {

    }
    @Test
    void test() throws Exception {

    }

}
