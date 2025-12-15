package com.compliancehub.service.builder;

import com.compliancehub.model.CommunicationStrategy;
import com.compliancehub.model.DPA;

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
        dpa = new DPA();
        dpa.setCustomerName(customerName);
        dpa.setProductName(productName);
        dpa.setFileUrl(url);
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

    public DPABuilder
}
