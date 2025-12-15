package com.compliancehub.mockClasses;

import com.compliancehub.model.DPA;
import com.compliancehub.model.Violation;

import java.util.List;

public class MockDPA {

    public static DPA getMock() {
        DPA mockDPA = new DPA();
        Violation violation = new Violation();
        violation.setDpa(mockDPA);
        violation.setDescription("This is a mock violation");
        mockDPA.setViolations(List.of(violation));
        mockDPA.setCustomerName("AAU Copenhagen");
        mockDPA.setFileUrl("https://example.com");
        mockDPA.setProductName("UniFlow");

        // mockDPA.setCommunicationStrats(NeedWrittenAprooval, EmailNotice);
        return mockDPA;
    }
}
