package com.compliancehub.controller;

import com.compliancehub.dto.DPADTO;
import com.compliancehub.service.DPAService;
import lombok.NoArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/dpa")

public class DPAController {
    private final DPAService service;

    public DPAController(DPAService service) {
        this.service = service;
    }

    @PostMapping("/")
    void create() {
        // todo: fill in logic
    }

    @DeleteMapping("/")
    void delete() {
        // todo: fill in logic
    }

    @GetMapping("/")
    public ResponseEntity<DPADTO.GetAllResponse> getAll() {
        return ResponseEntity.ok(service.getAll());
    }
}
