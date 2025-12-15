package com.compliancehub.strategy.CommunicationStrategy;

import com.compliancehub.model.Action;
import com.compliancehub.model.DPA;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashMap;
import java.util.Map;

@Getter
@Setter
@NoArgsConstructor
public class NeedEmailNotice implements ICommunicationStrategy {
    private String email;
    private int daysOfNotice = -1;

    public NeedEmailNotice(Map<String, Object> attributes) {
        parseAttributes(attributes);
    }

    @Override
    public Action createAction(DPA dpa) {
        Action newAction = new Action();
        newAction.setDescription("You need to notify " + email + " " + daysOfNotice + " days before switching data processor");
        return newAction;
    }

    @Override
    public Map<String, Object> createAttributeMap() {
        Map<String, Object> newMap = new HashMap<>();
        newMap.put("email", email);
        newMap.put("daysOfNotice", daysOfNotice);
        return newMap;
    }

    @Override
    public void parseAttributes(Map<String, Object> attributes) {
        if(attributes == null) return;

        this.email = (String) attributes.get("email");

        if (attributes.get("daysOfNotice") != null) {
            this.daysOfNotice = (int) attributes.get("daysOfNotice");
        }

        if (email == null || daysOfNotice == -1) {
            throw new RuntimeException("Error parsing attributes for communication strategy: Missing email or daysOfNotice");
        }
    }
}