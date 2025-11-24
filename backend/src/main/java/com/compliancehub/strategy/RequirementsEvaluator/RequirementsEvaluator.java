package com.compliancehub.strategy.RequirementsEvaluator;


import com.compliancehub.model.DPA;
import com.compliancehub.model.DataProcessor;
import com.compliancehub.model.Requirement;
import com.compliancehub.model.Violation;

import java.util.Map;

public interface RequirementsEvaluator {
    public void evaluate(DPA dpa, DataProcessor dataProcessor, Requirement requirement);

    /**
     * Skal tage de fields som er i subclassen og lave dem om til et Map<String, Object>.
     * Variablens navn skal skrives som en string, og dens værdi skal placeres i object.
     * @return Map<String, Object>
     */
    public Map<String, Object> createAttributesMap();

    /**
     * Skal tage i mod attributes i formen Map<String, Object>
     * Give alle fields i subclassen den rigtige værdi ud fra map
     */
    public void parseAttributes(Map<String, Object> attributes);

}
