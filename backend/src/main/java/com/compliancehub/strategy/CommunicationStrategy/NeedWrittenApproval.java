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
public class NeedWrittenApproval implements CommunicationStrategy {
    private String email;

    public NeedWrittenApproval(Map<String, Object> attributes) {
        parseAttributes(attributes);
    }

    @Override
    public Action createAction(DPA dpa) {
        Action newAction = new Action();
        newAction.setDescription("You need written approval from " + dpa.getCustomerName() +
                " (" + email + ") before changing data processor");
        return newAction;
    }

    @Override
    public Map<String, Object> createAttributeMap() {
        Map<String, Object> newMap = new HashMap<>();
        newMap.put("email", email);
        return newMap;
    }

    @Override
    public void parseAttributes(Map<String, Object> attributes) {
        if (attributes != null) {
            this.email = (String) attributes.get("email");
        }

        if (email == null) {
            throw new RuntimeException("Error parsing attributes: Email is missing");
        }
    }
}