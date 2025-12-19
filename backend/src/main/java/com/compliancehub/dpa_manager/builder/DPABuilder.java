package com.compliancehub.dpa_manager.builder;

import com.compliancehub.compliance_engine.model.CommunicationStrategy;
import com.compliancehub.compliance_engine.model.Requirement;
import com.compliancehub.dpa_manager.DPA;

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

    // 1. REQUIREMENTS (Strategy Pattern)
    // Denne metode bygger et Requirement-objekt med det samme og smider det i listen.
    public DPABuilder withLocationRequirement(List<String> allowedLocations){
        Requirement r = new Requirement();
        r.setDpa(this.dpa);

        // Vi vælger strategien (evaluatoren)
        r.setReqEvaluator("ProcessingLocationEvaluator");

        // Vi sætter data (attributes)
        Map<String, Object> attributes = new HashMap<>();
        attributes.put("allowedLocations", allowedLocations);
        r.setAttributes(attributes);

        this.dpa.addRequirement(r);

        return this;
    }

    // 2. COMMUNICATION STRATEGIES (Strategy Pattern)
    public DPABuilder withCommunicationRule(boolean writtenApprovalNeeded, int daysOfNotice){
        CommunicationStrategy strat = new CommunicationStrategy();
        strat.setDpa(this.dpa);

        // Vælg strategi-navn
        if (writtenApprovalNeeded) {
            strat.setStrategy("NeedWrittenApproval");
        }

        strat.setStrategy("NeedEmailNotice");

        // Byg attributter (Dataen til strategien)
        Map<String, Object> attributes = new HashMap<>();
        attributes.put("daysOfNotice", daysOfNotice);

        // Hvis det er email, skal vi bruge en modtager (bruger kundenavn)
        //!!dette skal fikses/updated!!
        if (!writtenApprovalNeeded) {
            attributes.put("email", dpa.getCustomerName());
        }

        strat.setAttributes(attributes);

        this.dpa.addCommunicationStrategy(strat);

        return this;
    }

    // 3. BUILD
    public DPA build(){
        return this.dpa;
    }
}