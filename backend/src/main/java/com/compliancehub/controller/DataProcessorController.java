package com.compliancehub.controller;

// 1. Make sure this import matches the package where you put the DataProcessorDTO class
import com.compliancehub.dto.DataProcessorDTO;
import com.compliancehub.service.DataProcessorService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RestController
@RequestMapping("/dataprocessors")
public class DataProcessorController {

    private final DataProcessorService service;

    public DataProcessorController(DataProcessorService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<DataProcessorDTO.CreateResponse> create(
        @Valid @RequestBody DataProcessorDTO.CreateRequest req) {

        DataProcessorDTO.CreateResponse newDataProcessor = service.create(req);

        // Good practice: Return the location header
        URI location = URI.create("/dataprocessors/" + newDataProcessor.id());

        return ResponseEntity.created(location).body(newDataProcessor);
    }


//    @GetMapping
//    getAll
//
//    @DeleteMapping
//    delete
//
//    @PostMapping
//    create
}
