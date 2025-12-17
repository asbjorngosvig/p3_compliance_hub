package com.compliancehub.dpa_manager.builder;

import com.compliancehub.compliance_engine.model.CommunicationStrategy;
import com.compliancehub.dpa_manager.DPA;
import com.compliancehub.dpa_manager.Requirement;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class DPABuilder {
    private DPA dpa;

    public DPABuilder (String customerName, String productName, String url){
        this.dpa = new DPA();
        this.dpa.setCustomerName(customerName);
        this.dpa.setProductName(productName);
        this.dpa.setFileUrl(url);
    }

    public DPABuilder withWrittenApproval(boolean needed){
        if (needed){
            CommunicationStrategy strat = new CommunicationStrategy();
            strat.setDpa(this.dpa);
            strat.setStrategy("NeedWrittenApproval");
            this.dpa.addCommunicationStrategy(strat);
        }
        return this;
    }

    public DPABuilder withNoticePeriod(int days){
        CommunicationStrategy s = new CommunicationStrategy();
        s.setDpa(this.dpa);
        s.setStrategy("DaysOfNotice");

        Map<String, Object> attributes = new HashMap<>();
        attributes.put("email", dpa.getCustomerName());
        // todo: find en måde at bruge email istedet for navn her...
        attributes.put("daysOfNotice", days);
        s.setAttributes(attributes);

        this.dpa.addCommunicationStrategy(s);

        return this;
    }

    public DPABuilder withLocationRequirement(List<String> allowedLocations){
        Requirement r = new Requirement();
        r.setDpa(this.dpa);

        Map<String, Object> attributes = new HashMap<>();
        attributes.put("allowedLocations", allowedLocations);
        r.setAttributes(attributes);

        r.setReqEvaluator("ProcessingLocationEvaluator");
        this.dpa.addRequirement(r);

        return this;
    }

    public DPA build(){
        return this.dpa;
    }
}
