package com.compliancehub.controller;



import com.compliancehub.dto.customer.CustomerCreateResponse;
import com.compliancehub.dto.dataprocessor.DataProcessorCreateRequest;
import com.compliancehub.dto.dataprocessor.DataProcessorCreateResponse;
import com.compliancehub.dto.dataprocessor.DataProcessorGetResponse;
import com.compliancehub.dto.user.UserGetResponse;
import com.compliancehub.service.DataProcessorService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RestController
@RequestMapping("/dataprocessors")
public class DataProcessorController {
    DataProcessorService service;

    public DataProcessorController(DataProcessorService service) {
        this.service = service;
    }

    @GetMapping("/{id}")
    ResponseEntity<DataProcessorGetResponse> getById(@PathVariable long id) {
        DataProcessorGetResponse dp = service.getById(id);

        URI location = URI.create("/dataprocessor/" + dp.id());

        return ResponseEntity.created(location).body(dp);
    }

    @PostMapping("/")
    ResponseEntity<DataProcessorCreateResponse> create(@RequestBody DataProcessorCreateRequest req) {
        DataProcessorCreateResponse newDataProcessor = service.create(req);

        URI location = URI.create("/dataprocessor/" + newDataProcessor.id());

        return ResponseEntity.created(location).body(newDataProcessor);
    }
}
