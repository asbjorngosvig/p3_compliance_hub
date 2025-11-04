package com.compliancehub.controller;

import com.compliancehub.dto.dataprocessor.DataProcessorCreateRequest;
import com.compliancehub.dto.dataprocessor.DataProcessorCreateResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RestController
@RequestMapping("/dpa")
public class DPAController {

    @PostMapping("/")
    void create() {
        // fill in logic
    }

    @DeleteMapping("/")
    void delete() {
        // fill in logic
    }

    @GetMapping("/")
    void getAll() {
        // fill in logic
    }
}
