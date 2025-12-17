package com.compliancehub.mockClasses;

import com.compliancehub.dpa_manager.DPA;

public class MockDPA {

    public static DPA getMock() {
        DPA mockDPA = new DPA();

        mockDPA.setCustomerName("AAU Copenhagen");
        mockDPA.setFileUrl("https://example.com");
        mockDPA.setProductName("UniFlow");
        // mockDPA.setCommunicationStrats(NeedWrittenApproval, EmailNotice);
        return mockDPA;
    }
}
