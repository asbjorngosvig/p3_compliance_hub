package com.compliancehub.mockClasses;

import com.compliancehub.model.DPA;
import com.compliancehub.model.Requirement;
import com.compliancehub.utils.Locations;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class MockRequirements {

    public static List<Requirement> getMock(DPA dpa) {

        List<Requirement> mockRequirements = new ArrayList<>();

        Requirement req1 = new Requirement();
        req1.setDpa(dpa);

        Map<String, Object> attributes = new HashMap<>();
        attributes.put("allowedProcessingLocations", new ArrayList<>(Locations.EU));

        req1.setAttributes(attributes);
        return new ArrayList<>();
    }
}
