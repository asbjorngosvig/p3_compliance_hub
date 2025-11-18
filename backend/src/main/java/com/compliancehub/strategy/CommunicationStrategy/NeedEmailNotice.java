package com.compliancehub.strategy.CommunicationStrategy;

import com.compliancehub.model.Action;
import com.compliancehub.model.DPA;

import java.util.HashMap;
import java.util.Map;

public class NeedEmailNotice implements CommuncationStrategy {
    String email;
    int daysOfNotice;

    @Override
    public Action createAction(DPA dpa) {
        Action newAction = new  Action();
        newAction.setDescription("You need to notice "+email + " " + daysOfNotice +  " days before switching data processor");
        return newAction;
    }

    @Override
    public Map<String, Object> createAttributeMap() {
        Map<String, Object> newMap = new HashMap<>();

        // put all attributes here
        newMap.put("email", email);
        newMap.put("daysOfNotice", daysOfNotice);

        return newMap;
    }

    @Override
    public void parseAttributes(Map<String, Object> attributes) {
        this.email = (String) attributes.get("email");
        this.daysOfNotice = (int) attributes.get("daysOfNotice");
    }
}
