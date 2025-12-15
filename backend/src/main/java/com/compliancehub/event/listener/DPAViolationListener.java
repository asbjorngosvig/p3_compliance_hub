package com.compliancehub.event.listener;

import com.compliancehub.event.DPACreatedEvent;
import com.compliancehub.model.DataProcessor;
import com.compliancehub.repository.DataProcessorRepository;
import com.compliancehub.service.DPAService;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DPAViolationListener {

    private final DataProcessorRepository dpRepository;
    private final DPAService dpaService;

    public DPAViolationListener(DataProcessorRepository repository, DPAService service) {
        this.dpRepository = repository;
        this.dpaService = service;
    }

    @EventListener
    public void handleDPACreated(DPACreatedEvent e){

    }
}
