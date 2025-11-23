package com.compliancehub.strategy.RequirementsEvaluator;

import com.compliancehub.model.DPA;
import com.compliancehub.model.DataProcessor;
import com.compliancehub.model.Requirement;
import com.compliancehub.model.Violation;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.jar.Attributes;

public class ProcessingLocationEvaluator implements RequirementsEvaluator {
    private List<String> allowedLocations;

    public ProcessingLocationEvaluator(Map<String, Object> attributes) {
        parseAttributes(attributes);
    }

    @Override
    public void evaluate(DPA dpa, DataProcessor dataProcessor, Requirement requirement) {
        parseAttributes(requirement.getAttributes());
        for (String location : dataProcessor.getProcessingLocations()) {
            if (!allowedLocations.contains(location)) {
                Violation newViolation = new Violation();
                newViolation.setDpa(dpa);
                newViolation.setDataProcessor(dataProcessor);
                newViolation.setDescription(dataProcessor.getName() +" is processing in " + location);
                dpa.addViolation(newViolation);
            }
        }
    }

    public List<String> getAllowedLocations() {
        return allowedLocations;
    }

    @Override
    public Map<String, Object> createAttributesMap() {
        Map<String, Object> attributes = new HashMap<>();

        attributes.put("allowedLocations", allowedLocations);

        return attributes;
    }

    @Override
    public void parseAttributes(Map<String, Object> attributes) {
        this.allowedLocations = (List<String>) attributes.get("allowedLocations");
    }
}
