package com.compliancehub.Strategy.RequirementsEvaluator;

import com.compliancehub.model.DPA;
import com.compliancehub.model.DataProcessor;
import com.compliancehub.model.Requirement;
import com.compliancehub.model.Violation;
import com.compliancehub.strategy.RequirementsEvaluator.ProcessingLocationEvaluator;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;


class ProcessingLocationEvaluatorTest {

    public ProcessingLocationEvaluator evaluator;
    public Map<String, Object> attributes = new HashMap<>();
    public List<String> allowedLocation = new ArrayList<>();
    public DPA dpa = new DPA();
    public DataProcessor dataProcessor = new DataProcessor();

    @BeforeEach
    void setup() {
        allowedLocation.add("United States");
        allowedLocation.add("EEA");
        attributes.put("allowedLocations", allowedLocation);

        Requirement requirement = new Requirement();
        requirement.setDpa(dpa);
        requirement.setReqEvaluator("ProcessingLocationEvaluator");
        requirement.setAttributes(attributes);

        dpa.setRequirements(List.of(requirement));

        dataProcessor.setName("Microsoft");
        dataProcessor.setProcessingLocations(List.of("EEA", "United States", "Canada"));

        evaluator = new ProcessingLocationEvaluator(attributes);
    }

    @Test
    void createAttributesTest() {
        assertEquals(attributes, evaluator.createAttributesMap());
    }

    @Test
    void parseAttributesTest() {
        evaluator.parseAttributes(attributes);
        assertEquals(this.allowedLocation, evaluator.getAllowedLocations());
    }

    @Test
    void evaluateWithInvalidProcessingLocations() {
        evaluator.evaluate(dpa, dataProcessor, dpa.getRequirements().get(0));

        assertTrue(!dpa.getViolations().isEmpty());
    }

    @Test
    void evaluateWithValidProcessingLocations() {
        Requirement requirement = new Requirement();

        allowedLocation.add("Canada");

        attributes.put("allowedLocations", allowedLocation);

        requirement.setAttributes(attributes);
        dpa.setRequirements(List.of(requirement));

        evaluator.evaluate(dpa, dataProcessor, dpa.getRequirements().get(0));

        assertTrue(dpa.getViolations().isEmpty());
    }
}