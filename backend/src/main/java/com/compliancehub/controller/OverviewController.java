package com.compliancehub.controller;

import com.compliancehub.service.OverviewService;
import com.compliancehub.service.UserService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/overview")
public class OverviewController {
    OverviewService service;

    public OverviewController(OverviewService service) {
        this.service = service;
    }

    @GetMapping("/")
    void getOverview() {
        // fill in logic
    }
}
