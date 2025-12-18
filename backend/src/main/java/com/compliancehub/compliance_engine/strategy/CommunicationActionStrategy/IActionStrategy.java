package com.compliancehub.compliance_engine.strategy.CommunicationActionStrategy;

import com.compliancehub.compliance_engine.model.Action;
import com.compliancehub.dpa_manager.DPA;

import java.util.Map;

public interface IActionStrategy {
    Action createAction(DPA dpa);

    public Map<String, Object> createAttributeMap();

    public void parseAttributes(Map<String, Object> attributes);
}
