package com.compliancehub.service.builder;

import com.compliancehub.model.CommunicationStrategy;
import com.compliancehub.model.DPA;
import com.compliancehub.model.Requirement;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class DPABuilder {
    /*
    1) set customer name
    2) set product name
    3) set file URL
    4) set comm strats (kun nogen gange. også alle typer både måden at få info på og hvornår man skal ha den)
    5) set requirements
    6) return dpa

    herefter fikser service eller observer at lave violations
     */

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
}
