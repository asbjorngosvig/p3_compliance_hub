package com.compliancehub.strategy.CommunicationStrategy;

import com.compliancehub.model.Action;
import com.compliancehub.model.DPA;

import java.util.Map;

public interface CommuncationStrategy {
    Action createAction(DPA dpa);

    public Map<String, Object> createAttributeMap();

    public void parseAttributes(Map<String, Object> attributes);
}
