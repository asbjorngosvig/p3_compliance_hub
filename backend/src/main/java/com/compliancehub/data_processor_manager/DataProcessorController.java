package com.compliancehub.data_processor_manager;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.UUID;

@RestController
@RequestMapping("/dataprocessors")
public class DataProcessorController {

    private final DataProcessorService service;

    public DataProcessorController(DataProcessorService service) {
        this.service = service;
    }

    @PostMapping ({"", "/"})
    public ResponseEntity<DataProcessorDTO.CreateResponse> create(
        @Valid @RequestBody DataProcessorDTO.CreateRequest req) {

        DataProcessorDTO.CreateResponse createResponse = service.create(req);

        // Good practice: Return the location header
        URI location = URI.create("/dataprocessors/" + createResponse.createdDataProcessor().id());

        return ResponseEntity.created(location).body(createResponse);
    }


    @GetMapping ({"", "/"})
    public ResponseEntity<DataProcessorDTO.GetAllResponse> getAll(){
        return ResponseEntity.ok(service.getAllSorted());
    }

    
    @GetMapping("/{id}")
    public ResponseEntity<DataProcessorDTO.StandardDataProcessorResponse> getById(@PathVariable UUID id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id){
        service.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<DataProcessorDTO.CreateResponse> update(
        @PathVariable UUID id,
        @Valid @RequestBody DataProcessorDTO.CreateRequest req
    ) {
        return ResponseEntity.ok(service.update(id, req));
    }
}
