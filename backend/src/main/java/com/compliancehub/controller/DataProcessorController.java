package com.compliancehub.controller;



import com.compliancehub.dto.dataprocessor.DataProcessorGetResponse;
import com.compliancehub.dto.user.UserGetResponse;
import com.compliancehub.service.DataProcessorService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
