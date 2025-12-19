package com.compliancehub.compliance_engine.strategy.ActionStrategy;

import com.compliancehub.compliance_engine.model.Action;
import com.compliancehub.dpa_manager.DPA;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashMap;
import java.util.InputMismatchException;
import java.util.Map;

@Getter
@Setter
@NoArgsConstructor
public class EmailNoticeStrategy implements IActionStrategy {
    private String email;
    private int daysOfNotice = -1;

    public EmailNoticeStrategy(Map<String, Object> attributes) {
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
        if(attributes == null) {
            throw new InputMismatchException("Attributes are null");
        };

        this.email = (String) attributes.get("email");

        if (attributes.get("daysOfNotice") != null) {
            this.daysOfNotice = (int) attributes.get("daysOfNotice");
        }

        if (email == null || daysOfNotice == -1) {
            throw new InputMismatchException("Error parsing attributes for communication strategy: Missing email or daysOfNotice");
        }
    }
}