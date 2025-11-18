package com.compliancehub.Strategy.RequirementsEvaluator;

import com.compliancehub.strategy.RequirementsEvaluator.ProcessingLocationEvaluator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

import static org.junit.jupiter.api.Assertions.*;


@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
class ProcessingLocationEvaluatorTest {

    @Autowired
    private MockMvc mockMvc;

}