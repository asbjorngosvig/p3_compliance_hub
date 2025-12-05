package com.compliancehub.strategy.RequirementsEvaluator;

import com.compliancehub.model.DPA;
import com.compliancehub.model.DataProcessor;
import com.compliancehub.model.Violation;
import lombok.Data;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Data
public class ProcessingLocationEvaluator implements RequirementsEvaluator {
    // Initialiser listen for at undgå NullPointerException
    private List<String> allowedLocations = new ArrayList<>();

    public ProcessingLocationEvaluator(Map<String, Object> attributes) {
        parseAttributes(attributes);
    }

    @Override
    public void evaluate(DPA dpa, DataProcessor dataProcessor) {
        // Safety check: Hvis dataProcessor eller allowedLocations er tomme, stop.
        if (dataProcessor.getProcessingLocations() == null || allowedLocations.isEmpty()) {
            return;
        }

        List<String> violationsFound = new ArrayList<>();

        for (String location : dataProcessor.getProcessingLocations()) {
            if (!allowedLocations.contains(location)) {
                violationsFound.add(location);
            }
        }

        if (!violationsFound.isEmpty()) {
            Violation newViolation = new Violation();
            newViolation.setDpa(dpa);
            newViolation.setDataProcessor(dataProcessor);

            String badLocationsString = String.join(", ", violationsFound);

            newViolation.setDescription(
                dataProcessor.getName() + " is processing in [" + badLocationsString +
                    "] which is not allowed by " + dpa.getCustomerName()
            );

            // Vigtigt: Brug helper metoden på DPA for at gemme relationen korrekt
            dpa.addViolation(newViolation);
        }
    }

    @Override
    public Map<String, Object> createAttributesMap() {
        Map<String, Object> attributes = new HashMap<>();
        attributes.put("allowedLocations", allowedLocations);

        return attributes;
    }

    @Override
    public void parseAttributes(Map<String, Object> attributes) {
        if (attributes != null && attributes.containsKey("allowedLocations")) {
            try {
                this.allowedLocations = (List<String>) attributes.get("allowedLocations");
            } catch (ClassCastException e) {
                System.err.println("Fejl i parsing af locations: " + e.getMessage());
                this.allowedLocations = new ArrayList<>();
            }
        }
    }
}