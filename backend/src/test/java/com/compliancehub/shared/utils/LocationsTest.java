package com.compliancehub.shared.utils;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class LocationsTest {

    @Test
    void getLocations() {

        assertEquals(true, Locations.EEA.contains("FRANCE"));

        assertEquals(false, Locations.EU.contains("UNITED KINGDOM"));

        assertEquals(true, Locations.EU.contains("GREECE"));

        assertEquals(true, Locations.groups.containsKey("EEA"));

        assertEquals(true, Locations.groups.get("EEA").contains("FRANCE"));

        assertEquals(false, Locations.groups.get("North America".toUpperCase()).contains("FRANCE"));

        assertEquals(true, Locations.groups.get("North America".toUpperCase()).contains("United States".toUpperCase()));

        assertEquals(null, Locations.groups.get("North America"));

        assertNotEquals(null, Locations.groups.get("NORTH AMERICA"));

    }
}