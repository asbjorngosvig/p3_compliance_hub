package com.compliancehub.strategy.CommunicationStrategy;

import com.compliancehub.model.Action;
import com.compliancehub.model.DPA;

import java.util.HashMap;
import java.util.Map;

public class NeedWrittenAprooval implements CommunicationStrategy{
    public String email;

    @Override
    public Action createAction(DPA dpa) {
        Action newAction = new  Action();
        newAction.setDescription("You need written approval from " + dpa.getCustomerName() + " before changing data processor");
        return newAction;
    }

    @Override
    public Map<String, Object> createAttributeMap() {
        Map<String, Object> newMap = new HashMap<>();

        // put all attributes here
        newMap.put("email", email);

        return newMap;
    }

    @Override
    public void parseAttributes(Map<String, Object> attributes) {
        this.email = (String) attributes.get("email");
    }
}
