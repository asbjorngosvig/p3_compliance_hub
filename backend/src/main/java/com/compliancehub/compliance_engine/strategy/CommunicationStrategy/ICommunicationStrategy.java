package com.compliancehub.compliance_engine.strategy.CommunicationStrategy;

import com.compliancehub.compliance_engine.model.Action;
import com.compliancehub.dpa_manager.DPA;

import java.util.Map;

public interface ICommunicationStrategy {
    Action createAction(DPA dpa);

    public Map<String, Object> createAttributeMap();

    public void parseAttributes(Map<String, Object> attributes);
}
