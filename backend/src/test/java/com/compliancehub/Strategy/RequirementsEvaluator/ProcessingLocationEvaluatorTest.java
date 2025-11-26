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


    /**
     * Sætter en Dataprocessor og DPA op med nogle locations.
     */
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

    /**
     * Tester om attributes bliver mappet korrekt
     */
    @Test
    void createAttributesTest() {
        assertEquals(attributes, evaluator.createAttributesMap());
    }

    /**
     * Tester om variablerne får de rigtige værdier efter parsing
     */
    @Test
    void parseAttributesTest() {
        evaluator.parseAttributes(attributes);
        assertEquals(this.allowedLocation, evaluator.getAllowedLocations());
    }

    /**
     * Tester om der bliver oprettet en violation når DP indeholder canada, og dpa ikke gør
     */
    @Test
    void evaluateWithInvalidProcessingLocations() {
        evaluator.evaluate(dpa, dataProcessor);
        List<Violation> violations = dpa.getViolations();

        assertNotNull(violations.getFirst().getDescription());
        assertEquals(1, violations.size());
    }

    /**
     * Tester om der ikke bliver oprettet en violation når de begge har samme locations
     */
    @Test
    void evaluateWithValidProcessingLocations() {
        Requirement requirement = new Requirement();

        allowedLocation.add("Canada");

        attributes.put("allowedLocations", allowedLocation);

        requirement.setAttributes(attributes);
        dpa.setRequirements(List.of(requirement));

        evaluator.evaluate(dpa, dataProcessor);

        assertTrue(dpa.getViolations().isEmpty());
    }
}