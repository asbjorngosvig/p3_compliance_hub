package com.compliancehub.strategy.RequirementsEvaluator;


import com.compliancehub.model.DPA;
import com.compliancehub.model.DataProcessor;
import com.compliancehub.model.Violation;

public interface RequirementsEvaluator {
    Violation evaluate(DPA dpa, DataProcessor dataProcessor);
}
