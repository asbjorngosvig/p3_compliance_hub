package com.compliancehub.event;

import com.compliancehub.model.DPA;
import org.springframework.context.ApplicationEvent;

public class DPACreatedEvent extends ApplicationEvent {
    private final DPA dpa;

    public DPACreatedEvent(Object source, DPA dpa){
        super(source);
        this.dpa = dpa;
    }

    public DPA getDPA() {
        return dpa;
    }
}
