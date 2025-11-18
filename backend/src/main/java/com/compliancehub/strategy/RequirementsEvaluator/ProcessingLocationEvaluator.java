package com.compliancehub.strategy.RequirementsEvaluator;

import com.compliancehub.model.DPA;
import com.compliancehub.model.DataProcessor;
import com.compliancehub.model.Requirement;
import com.compliancehub.model.Violation;

import java.util.List;
import java.util.Map;

public class ProcessingLocationEvaluator implements RequirementsEvaluator {
    @Override
    public Violation evaluate(DPA dpa, DataProcessor dataProcessor) {
        return null;
    }

    @Override
    public Map<String, Object> createAttributesMap() {

    }

    @Override
    public void parseAttributes(Map<String, Object> attributes) {

    }


}
