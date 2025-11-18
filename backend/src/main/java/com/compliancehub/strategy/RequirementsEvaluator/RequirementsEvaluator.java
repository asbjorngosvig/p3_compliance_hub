package com.compliancehub.strategy.RequirementsEvaluator;


import com.compliancehub.model.DPA;
import com.compliancehub.model.DataProcessor;
import com.compliancehub.model.Requirement;
import com.compliancehub.model.Violation;

import java.util.Map;

public interface RequirementsEvaluator {
    public void evaluate(DPA dpa, DataProcessor dataProcessor, Requirement requirement);

    public Map<String, Object> createAttributesMap();

    public void parseAttributes(Map<String, Object> attributes);

}
