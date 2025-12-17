package com.compliancehub.mockClasses;

import com.compliancehub.data_processor_manager.DataProcessor;
import com.compliancehub.shared.utils.Locations;

import java.util.ArrayList;

public class MockDataProcessor {

    public static DataProcessor getMock() {
        DataProcessor mockDP = new DataProcessor();
        mockDP.setProcessingLocations(new ArrayList<>(Locations.EU));
        mockDP.setName("Scalingo");
        mockDP.setService("Hosting unicorns");
        mockDP.setNote("All colors");

        return mockDP;
    }
}
