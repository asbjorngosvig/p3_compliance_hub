package com.compliancehub.strategy.RequirementsEvaluator;


import com.compliancehub.model.DPA;
import com.compliancehub.model.DataProcessor;
import com.compliancehub.model.Violation;

import java.util.Map;

public interface RequirementsEvaluator {
    Violation evaluate(DPA dpa, DataProcessor dataProcessor);


    Map<String, Object> createAttributesMap();

    void parseAttributes( Map<String, Object> attributes);

}
