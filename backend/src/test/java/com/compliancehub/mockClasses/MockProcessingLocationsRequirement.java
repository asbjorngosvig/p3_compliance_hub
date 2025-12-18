package com.compliancehub.mockClasses;

import com.compliancehub.dpa_manager.DPA;
import com.compliancehub.dpa_manager.Requirement;
import com.compliancehub.shared.utils.Locations;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class MockProcessingLocationsRequirement {

    public static Requirement getMockWithValidLocations(DPA dpa) {
        Requirement req = new Requirement();
        req.setDpa(dpa);

        Map<String, Object> attributes = new HashMap<>();
        List<String> eu = new ArrayList<>(Locations.EU);
        attributes.put("allowedLocations", eu);
        req.setReqEvaluator("ProcessingLocationEvaluator");
        req.setAttributes(attributes);
        return req;
    }

    public static Requirement getMockWithInvalidLocations(DPA dpa) {
        Requirement req = new Requirement();
        req.setDpa(dpa);

        Map<String, Object> attributes = new HashMap<>();
        attributes.put("allowedLocations", List.of("INVALID_LOCATIONS"));
        req.setReqEvaluator("ProcessingLocationEvaluator");
        req.setAttributes(attributes);
        return req;
    }
}
