package com.compliancehub.controller;

import com.compliancehub.dto.DPA_DTO;
import com.compliancehub.service.DPAService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RestController
@RequestMapping("/dpa")
public class DPAController {
    private final DPAService service;

    public DPAController(DPAService service) {
        this.service = service;
    }

    //Create new DPA
    @PostMapping("/")
    public ResponseEntity<DPA_DTO.CreateResponse> create(
        @RequestBody DPA_DTO.CreateRequest req) {

        DPA_DTO.CreateResponse createResponse = service.create(req);

        // Good practice: Return the location header
        URI location = URI.create("/dpa/" + createResponse.createdDPA().id());

        return ResponseEntity.created(location).body(createResponse);
    }

    @DeleteMapping("/")
    void delete() {
        // todo: fill in logic
    }

//    @GetMapping("/")
//    public ResponseEntity<DPA_DTO.GetAllResponse> getAll() {
//        return ResponseEntity.ok(service.getAll());
//    }
}
