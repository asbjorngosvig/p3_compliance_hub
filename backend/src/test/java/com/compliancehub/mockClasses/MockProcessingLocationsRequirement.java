package com.compliancehub.mockClasses;

import com.compliancehub.model.DPA;
import com.compliancehub.model.Requirement;
import com.compliancehub.utils.Locations;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class MockProcessingLocationsRequirement {

    public static Requirement getMockWithValidLocations(DPA dpa) {
        Requirement req = new Requirement();
        req.setDpa(dpa);

        Map<String, Object> attributes = new HashMap<>();
        attributes.put("allowedLocations", List.of(Locations.EU));
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
