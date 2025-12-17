package com.compliancehub.compliance_engine.strategy.RequirementsComplianceChecker;


import com.compliancehub.dpa_manager.DPA;
import com.compliancehub.data_processor_manager.DataProcessor;

import java.util.Map;

public interface IRequirementsComplianceChecker {


    /**
     * Sammenligner 1 dpa med 1 dp og laver violations
     * @param dpa
     * @param dataProcessor
     */
    void detectViolations(DPA dpa, DataProcessor dataProcessor);

    /**
     * Skal tage de fields som er i subclassen og lave dem om til et Map<String, Object>.
     * Variablens navn skal skrives som en string, og dens værdi skal placeres i object.
     * @return Map<String, Object>
     */
    Map<String, Object> createAttributesMap();

    /**
     * Skal tage i mod attributes i formen Map<String, Object>
     * Give alle fields i subclassen den rigtige værdi ud fra map
     */
    void parseAttributes(Map<String, Object> attributes);

}
