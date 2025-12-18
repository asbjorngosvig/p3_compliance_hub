package com.compliancehub.compliance_engine.strategy.RequirementsComplianceChecker;

import com.compliancehub.dpa_manager.DPA;
import com.compliancehub.data_processor_manager.DataProcessor;
import com.compliancehub.compliance_engine.model.Violation;
import com.compliancehub.shared.utils.Locations;
import lombok.Data;

import java.util.*;

@Data
public class ProcessingLocationComplianceChecker implements IRequirementsComplianceChecker {
    // Initialiser listen for at undgå NullPointerException
    private List<String> allowedLocations = new ArrayList<>();

    public ProcessingLocationComplianceChecker(Map<String, Object> attributes) {
        parseAttributes(attributes);
    }

    @Override
    public void detectViolations(DPA dpa, DataProcessor dataProcessor) {

        // gets locations with all EEA, EU, NA so on... countries
        List<String> DPLocations = extractSpecialLocations(dataProcessor.getProcessingLocations());
        List<String> DPALocations = extractSpecialLocations(allowedLocations);
        // Safety check: Hvis dataProcessor eller allowedLocations er tomme, stop.
        if (DPLocations.isEmpty() || DPALocations.isEmpty()) {
            return;
        }

        List<String> violationsFound = new ArrayList<>();

        // checks any location mismatch
        for (String location : DPLocations) {
            if (!DPALocations.contains(location)) {
                violationsFound.add(location);
            }
        }

        // samler alle landende som er mismathced og laver èn violation til dem
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

    // fjerner grupperne og tilføjer hvert land fra gruppen i stedet
    private List<String> extractSpecialLocations(List<String> locations) {
        List<String> newLocations = new ArrayList<>(locations);
        // hvis en locations er EEA, Undefined osv...
        if (newLocations.contains("EEA")) {
            newLocations.remove("EEA");
            newLocations.addAll(Locations.EEA);
        }

        if (newLocations.contains("EU")) {
            newLocations.remove("EU");
            newLocations.addAll(Locations.EU);
        }

        if (newLocations.contains("NORTH_AMERICA")) {
            newLocations.remove("NORTH_AMERICA");
            newLocations.addAll(Locations.NORTH_AMERICA);
        }
        return newLocations;
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
        } else {
            throw new InputMismatchException("invalid attributes for allowed Locations");
        }
    }
}